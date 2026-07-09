export interface ProjectData {
  title: string;
  description: string;
  category: string;
  techStack: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
}

export interface BlogPostData {
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export interface SiteFormData {
  // Section 1: Identity
  name: string;
  role: string;
  userEmail: string;
  avatarUrl: string;
  // Section 2: Hero
  headline: string;
  heroBio: string;
  primaryBtnLabel: string;
  secondaryBtnLabel: string;
  // Section 3: About
  aboutP1: string;
  aboutP2: string;
  // Section 4: Projects
  includeProjects: boolean;
  projects: ProjectData[];
  // Section 5: Blog Posts
  includeBlog: boolean;
  blogPosts: BlogPostData[];
  // Section 6: Contact
  contactHeading: string;
  contactIntro: string;
  // Section 7: Design
  vibe: string;
  vibeCustom: string;
  colorPalette: string;
  accentColor: string;
  backgroundPref: string;
  fontFeel: string;
  layoutFeel: string;
  styleInspirations: string;
  designNotes: string;
}
