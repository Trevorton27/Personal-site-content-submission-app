/**
 * Assembles the AI prompt from form data.
 * Takes the complete form state object and returns a formatted markdown string
 * ready to paste into an AI assistant.
 */
export function buildPrompt(form) {
  const lines = [];

  lines.push("# My Personal Website — Content & Design");
  lines.push("");
  lines.push(
    "Please customize the `simple-personal-website-sample` codebase with the following content and design preferences. Replace all placeholder text with the details below, preserving the existing site structure and component architecture."
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // ── Identity ──────────────────────────────────────────────────────────────
  lines.push("## Identity & Branding");
  lines.push("");
  if (form.name) lines.push(`- **Name:** ${form.name}`);
  if (form.role) lines.push(`- **Role / Title:** ${form.role}`);
  lines.push("");

  // ── Hero ──────────────────────────────────────────────────────────────────
  lines.push("## Hero Section");
  lines.push("");
  const headline = form.headline || (form.name ? `Hi, I'm ${form.name}.` : "");
  if (headline) lines.push(`- **Headline:** ${headline}`);
  if (form.heroBio) lines.push(`- **Intro bio:** ${form.heroBio}`);
  if (form.primaryBtnLabel) lines.push(`- **Primary button label:** ${form.primaryBtnLabel}`);
  if (form.secondaryBtnLabel) lines.push(`- **Secondary button label:** ${form.secondaryBtnLabel}`);
  lines.push("");

  // ── About ─────────────────────────────────────────────────────────────────
  lines.push("## About Section");
  lines.push("");
  if (form.aboutP1) {
    lines.push("**Paragraph 1:**");
    lines.push(form.aboutP1);
    lines.push("");
  }
  if (form.aboutP2) {
    lines.push("**Paragraph 2:**");
    lines.push(form.aboutP2);
    lines.push("");
  }

  // ── Projects ──────────────────────────────────────────────────────────────
  const projects = form.projects.filter((p) => p.title.trim());
  if (projects.length > 0) {
    lines.push("## Projects");
    lines.push("");
    lines.push(
      `Replace the contents of \`src/data/portfolio.json\` with the following ${projects.length} project(s):`
    );
    lines.push("");
    projects.forEach((p) => {
      lines.push(`### ${p.title}`);
      if (p.description) lines.push(`- **Description:** ${p.description}`);
      if (p.category) lines.push(`- **Category:** ${p.category}`);
      if (p.techStack) lines.push(`- **Tech stack:** ${p.techStack}`);
      if (p.githubUrl) lines.push(`- **GitHub:** ${p.githubUrl}`);
      if (p.demoUrl) lines.push(`- **Demo:** ${p.demoUrl}`);
      lines.push(`- **Featured on homepage:** ${p.featured ? "yes" : "no"}`);
      lines.push("");
    });
  }

  // ── Blog Posts ────────────────────────────────────────────────────────────
  const posts = form.blogPosts.filter((p) => p.title.trim());
  if (posts.length > 0) {
    lines.push("## Blog Posts");
    lines.push("");
    lines.push(
      `Replace the sample posts in the \`posts/\` directory with the following ${posts.length} post(s). Each should be saved as a \`.md\` file with the appropriate frontmatter.`
    );
    lines.push("");
    posts.forEach((post) => {
      lines.push(`### ${post.title}`);
      if (post.date) lines.push(`- **Date:** ${post.date}`);
      if (post.excerpt) lines.push(`- **Excerpt:** ${post.excerpt}`);
      if (post.content) {
        lines.push("");
        lines.push("**Full content:**");
        lines.push("");
        lines.push(post.content);
      }
      lines.push("");
    });
  }

  // ── Contact ───────────────────────────────────────────────────────────────
  lines.push("## Contact Section");
  lines.push("");
  if (form.contactHeading) lines.push(`- **Heading:** ${form.contactHeading}`);
  if (form.contactIntro) lines.push(`- **Intro text:** ${form.contactIntro}`);
  lines.push("");

  // ── Design ────────────────────────────────────────────────────────────────
  lines.push("## Design & Style");
  lines.push("");
  lines.push(
    "Apply the following visual design preferences to the site's Tailwind CSS classes, globals.css, and any relevant components:"
  );
  lines.push("");

  const vibe = form.vibeCustom || form.vibe;
  if (vibe) lines.push(`- **Overall vibe:** ${vibe}`);
  if (form.colorPalette) lines.push(`- **Color palette:** ${form.colorPalette}`);
  if (form.accentColor) lines.push(`- **Accent / primary color:** ${form.accentColor}`);
  if (form.backgroundPref) lines.push(`- **Background preference:** ${form.backgroundPref}`);
  if (form.fontFeel) lines.push(`- **Typography feel:** ${form.fontFeel}`);
  if (form.layoutFeel) lines.push(`- **Layout feel:** ${form.layoutFeel}`);
  if (form.styleInspirations) lines.push(`- **Style inspirations:** ${form.styleInspirations}`);

  if (form.designNotes) {
    lines.push("");
    lines.push("**Additional design notes:**");
    lines.push(form.designNotes);
  }

  lines.push("");
  lines.push("---");
  lines.push("");
  lines.push(
    "_Please make only the changes needed to reflect this content and style. Keep the existing component structure, file layout, and Next.js conventions intact._"
  );

  return lines.join("\n");
}
