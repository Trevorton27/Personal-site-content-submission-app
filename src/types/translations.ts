export interface TranslationShape {
  // TopBar
  siteTitle: string;
  siteTagline: string;
  langToggleLabel: string;
  themeLightLabel: string;
  themeDarkLabel: string;

  // Footer
  footerText: string;

  // Intro
  introHeading: string;
  introBody1: string;
  introBodyStrong: string;
  introBody2: string;
  requiredPre: string;
  requiredPost: string;

  sectionWord: string;

  // Section 1
  s1Title: string;
  s1Desc: string;
  s1NameLabel: string;
  s1NamePlaceholder: string;
  s1RoleLabel: string;
  s1RolePlaceholder: string;
  s1EmailLabel: string;
  s1EmailPlaceholder: string;
  s1EmailHint: string;
  s1AvatarLabel: string;
  avatarUploading: string;
  avatarChange: string;
  avatarUpload: string;
  avatarRemove: string;
  avatarHint: string;

  // Section 2
  s2Title: string;
  s2Desc: string;
  s2HeadlineLabel: string;
  s2HeadlineHint: string;
  s2HeadlinePlaceholderFn: (name: string) => string;
  s2BioLabel: string;
  s2BioHint: string;
  s2BioPlaceholder: string;
  s2PrimaryLabel: string;
  s2PrimaryHint: string;
  s2PrimaryPlaceholder: string;
  s2SecondaryLabel: string;
  s2SecondaryHint: string;
  s2SecondaryPlaceholder: string;

  // Section 3
  s3Title: string;
  s3Desc: string;
  s3P1Label: string;
  s3P1Placeholder: string;
  s3P2Label: string;
  s3P2Placeholder: string;

  // Section 4
  s4Title: string;
  s4Desc: string;
  addProject: string;

  // Section 5
  s5Title: string;
  s5Desc: string;
  addPost: string;

  // Section 6
  s6Title: string;
  s6Desc: string;
  s6HeadingLabel: string;
  s6HeadingPlaceholder: string;
  s6IntroLabel: string;
  s6IntroPlaceholder: string;

  // Section 7
  s7Title: string;
  s7Desc: string;
  s7VibeLabel: string;
  s7VibeCustomPlaceholder: string;
  s7ColorLabel: string;
  s7ColorHint: string;
  s7ColorPlaceholder: string;
  s7AccentLabel: string;
  s7AccentHint: string;
  s7AccentPlaceholder: string;
  s7BgLabel: string;
  s7FontLabel: string;
  s7LayoutLabel: string;
  s7InspirationLabel: string;
  s7InspirationHint: string;
  s7InspirationPlaceholder: string;
  s7NotesLabel: string;
  s7NotesPlaceholder: string;

  // Generate
  generateNote: string;
  generateBtn: string;
  generatePreviewBtn: string;
  previewGenerating: string;
  previewError: string;
  previewTryAgain: string;
  downloadHtmlBtn: string;
  openNewTabBtn: string;
  previewDeviceMobile: string;
  previewDeviceTablet: string;
  previewDeviceDesktop: string;

  // Options
  vibes: string[];
  bgPrefs: string[];
  fontFeels: string[];
  layoutFeels: string[];

  // ProjectEntry
  projectCardTitle: (i: number) => string;
  removeBtn: string;
  projectTitleLabel: string;
  projectTitlePlaceholder: string;
  projectDescLabel: string;
  projectDescHint: string;
  projectDescPlaceholder: string;
  projectCategoryLabel: string;
  projectCategoryDefault: string;
  projectCategories: string[];
  projectTechLabel: string;
  projectTechHint: string;
  projectTechPlaceholder: string;
  projectGithubLabel: string;
  projectGithubPlaceholder: string;
  projectDemoLabel: string;
  projectDemoPlaceholder: string;
  projectFeaturedLabel: string;

  // BlogPostEntry
  postCardTitle: (i: number) => string;
  postTitleLabel: string;
  postTitlePlaceholder: string;
  postDateLabel: string;
  postExcerptLabel: string;
  postExcerptHint: string;
  postExcerptPlaceholder: string;
  postContentLabel: string;
  postContentHint: string;
  postContentPlaceholder: string;

  // PromptOutput
  promptReady: string;
  promptDesc: string;
  copyBtn: string;
  copiedBtn: string;
  downloadBtn: string;
}
