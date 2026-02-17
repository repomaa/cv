import puppeteer from 'puppeteer';
import httpServer from 'http-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const BUILD_DIR = join(__dirname, '..', 'build');
const OUTPUT_PDF = join(BUILD_DIR, 'cv.pdf');

async function generatePDF() {
  console.log('🚀 Starting PDF generation...');

  // Check if we're in an environment that can run Chrome
  const isCI = process.env.CI || process.env.CONTINUOUS_INTEGRATION;
  const chromePath = process.env.PUPPETEER_EXECUTABLE_PATH;

  if (chromePath) {
    console.log('🔍 Using Chrome from:', chromePath);
  }

  // Start static server
  console.log('📡 Starting static file server...');
  const server = httpServer.createServer({
    root: BUILD_DIR,
    port: 3456,
    cache: -1, // Disable caching
    cors: true,
  });

  await new Promise((resolve) => {
    server.listen(3456, 'localhost', () => {
      console.log('✅ Server running at http://localhost:3456');
      resolve();
    });
  });

  try {
    // Launch browser options
    const launchOptions = {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
      ],
    };

    // Use custom Chrome path if available (e.g., from devbox or CI)
    if (chromePath) {
      launchOptions.executablePath = chromePath;
    }

    // Launch browser
    console.log('🌐 Launching browser...');
    const browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    // Navigate to print route for HTML rendering
    console.log('📄 Loading CV page...');
    await page.goto('http://localhost:3456/print/', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF
    console.log('📝 Generating PDF...');
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm',
      },
    });

    // Save PDF
    await writeFile(OUTPUT_PDF, pdfBuffer);
    console.log('✅ PDF saved to:', OUTPUT_PDF);

    // Close browser
    await browser.close();
  } catch (error) {
    console.error('⚠️  Error generating PDF:', error.message);

    if (isCI) {
      console.log('📝 CI environment detected, but Chrome may not be available.');
      console.log('   The PDF will need to be generated in a post-deployment step');
      console.log('   or in a CI environment with Chrome/Chromium installed.');
    } else {
      console.log('📝 To generate the PDF:');
      console.log('   Option 1: Run in devbox (NixOS): devbox run npm run build');
      console.log('   Option 2: Deploy to a hosting platform with Chrome');
    }

    // Don't exit with error - the static site is still usable
    console.log('⚠️  Continuing without PDF...');
  } finally {
    // Stop server
    server.close();
    console.log('🛑 Server stopped');
  }

  console.log('🎉 Build complete!');
}

generatePDF();
