import type { RequestHandler } from './$types.js';
import type { LaunchOptions } from 'puppeteer';
import puppeteer from 'puppeteer';

// This is a dynamic endpoint - not prerenderable
export const prerender = false;

// PDF generation configuration
const PDF_CONFIG = {
  format: 'A4' as const,
  printBackground: true,
  preferCSSPageSize: true,
  margin: {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm',
  },
};

// Browser launch options for different environments
const getLaunchOptions = (): LaunchOptions => {
  const chromePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  const options: LaunchOptions = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  };
  if (chromePath) {
    options.executablePath = chromePath;
  }
  return options;
};

export const GET: RequestHandler = async ({ url }: { url: URL }) => {
  // Check if Chrome/Puppeteer is available
  const chromePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  const isCI = process.env.CI || process.env.CONTINUOUS_INTEGRATION;

  if (!chromePath && !isCI) {
    // Return 503 if Chrome is not available
    return new Response(
      JSON.stringify({
        error: 'PDF generation not available',
        message:
          'Chrome/Chromium is not configured. Set PUPPETEER_EXECUTABLE_PATH environment variable.',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Get the base URL for the current request
    const baseUrl = `${url.protocol}//${url.host}`;
    const pdfUrl = `${baseUrl}/print/`;

    // Launch browser
    const browser = await puppeteer.launch(getLaunchOptions());
    const page = await browser.newPage();

    // Navigate to the PDF page with increased timeout
    // waitUntil: 'networkidle2' waits for 2 network connections to be idle
    // This is more lenient than 'networkidle0' which waits for 0 connections
    await page.goto(pdfUrl, {
      waitUntil: 'networkidle2',
      timeout: 120000, // Increased from 30s to 120s to handle slow GitHub API calls
    });

    // Wait for fonts to load
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF
    const pdfBuffer = await page.pdf(PDF_CONFIG);

    // Close browser
    await browser.close();

    // Create Blob from buffer for Response
    const pdfBlob = new Blob([pdfBuffer as unknown as ArrayBuffer], { type: 'application/pdf' });

    // Return PDF with appropriate headers
    return new Response(pdfBlob, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);

    return new Response(
      JSON.stringify({
        error: 'Failed to generate PDF',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
