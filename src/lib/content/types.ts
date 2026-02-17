// Content data types - clean interface definitions

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  website?: string;
  github: string;
  summary: string;
}

export interface Experience {
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language?: string;
  isFork: boolean;
}

export interface CVData {
  profile: Profile;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}
