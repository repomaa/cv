import type { CVData, Profile, Experience, Education, Skill } from './types.js';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const CONTENT_DIR = join(process.cwd(), 'src', 'lib', 'content');

function loadJsonFile<T>(filepath: string): T | null {
  try {
    const content = readFileSync(filepath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.warn(`Could not load ${filepath}:`, error instanceof Error ? error.message : error);
    return null;
  }
}

function loadJsonFilesFromDir<T>(dirPath: string): T[] {
  try {
    const files = readdirSync(dirPath, { withFileTypes: true });
    const items: T[] = [];

    for (const file of files) {
      if (file.isFile() && file.name.endsWith('.json')) {
        const item = loadJsonFile<T>(join(dirPath, file.name));
        if (item) {
          items.push(item);
        }
      }
    }

    return items;
  } catch (error) {
    console.warn(
      `Could not read directory ${dirPath}:`,
      error instanceof Error ? error.message : error
    );
    return [];
  }
}

function decodeBase64Email(email: string): string {
  try {
    return Buffer.from(email, 'base64').toString('utf-8');
  } catch {
    return email;
  }
}

export function loadProfile(): Profile {
  const profile = loadJsonFile<Profile>(join(CONTENT_DIR, 'profile.json')) ?? {
    name: 'Your Name',
    title: 'Developer',
    email: 'email@example.com',
    phone: undefined,
    location: 'Location',
    website: undefined,
    github: 'username',
    summary: 'A passionate developer.',
  };

  return {
    ...profile,
    email: decodeBase64Email(profile.email),
  };
}

export function loadExperience(): Experience[] {
  return loadJsonFilesFromDir<Experience>(join(CONTENT_DIR, 'experience'));
}

export function loadEducation(): Education[] {
  return loadJsonFilesFromDir<Education>(join(CONTENT_DIR, 'education'));
}

export function loadSkills(): Skill[] {
  return loadJsonFilesFromDir<Skill>(join(CONTENT_DIR, 'skills'));
}

export function loadAllContent(): CVData {
  return {
    profile: loadProfile(),
    experience: loadExperience(),
    education: loadEducation(),
    skills: loadSkills(),
    projects: [],
  };
}
