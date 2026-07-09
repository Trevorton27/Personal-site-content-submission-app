import { SYSTEM_PROMPT, SYSTEM_PROMPT_JA } from "@/lib/systemPrompt";
import type { SiteFormData } from "@/types/form";

// ── Prompt labels (English / Japanese) ────────────────────────────────────────

const labels = {
  en: {
    systemPrompt:    SYSTEM_PROMPT,
    mainTitle:       "# My Personal Website — Content & Design",
    mainIntro:       "Please customize the `simple-personal-website-sample` codebase with the following content and design preferences. Replace all placeholder text with the details below, preserving the existing site structure and component architecture.",
    identityH:       "## Identity & Branding",
    heroH:           "## Hero Section",
    aboutH:          "## About Section",
    projectsH:       "## Projects",
    projectsIntro:   (n: number) => `Replace the contents of \`src/data/portfolio.json\` with the following ${n} project(s):`,
    postsH:          "## Blog Posts",
    postsIntro:      (n: number) => `Replace the sample posts in the \`posts/\` directory with the following ${n} post(s). Each should be saved as a \`.md\` file with the appropriate frontmatter.`,
    contactH:        "## Contact Section",
    designH:         "## Design & Style",
    designIntro:     "Apply the following visual design preferences to the site's Tailwind CSS classes, globals.css, and any relevant components:",
    localizationH:   "## Localization",
    localizationBody: [
      'The site content is written in Japanese. Please:',
      '- Set `<html lang="ja">` on the root element',
      '- Use a Japanese-compatible font stack. Add `Noto Sans JP` from Google Fonts as the primary font, with system fallbacks: `"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif`',
      '- Confirm `<meta charset="UTF-8">` is present',
    ],
    removedH:        "## Sections to Remove",
    removeProjects:  "Remove the Portfolio / Projects section entirely — delete the portfolio page, remove all project cards from the homepage, and remove the portfolio link from navigation.",
    removeBlog:      "Remove the Blog section entirely — delete the blog listing page and all individual post pages, remove blog post previews from the homepage, and remove the blog link from navigation.",
    footer:          "_Please make only the changes needed to reflect this content and style. Keep the existing component structure, file layout, and Next.js conventions intact._",
    // field labels (used inline as `- ${L.fieldName} value`)
    name:            "**Name:**",
    role:            "**Role / Title:**",
    photo:           "**Profile photo:**",
    headline:        "**Headline:**",
    bio:             "**Intro bio:**",
    primaryBtn:      "**Primary button label:**",
    secondaryBtn:    "**Secondary button label:**",
    para1:           "**Paragraph 1:**",
    para2:           "**Paragraph 2:**",
    desc:            "**Description:**",
    category:        "**Category:**",
    techStack:       "**Tech stack:**",
    github:          "**GitHub:**",
    demo:            "**Demo:**",
    featured:        "**Featured on homepage:**",
    yes:             "yes",
    no:              "no",
    date:            "**Date:**",
    excerpt:         "**Excerpt:**",
    fullContent:     "**Full content:**",
    contactHeading:  "**Heading:**",
    contactIntro:    "**Intro text:**",
    vibe:            "**Overall vibe:**",
    colorPalette:    "**Color palette:**",
    accentColor:     "**Accent / primary color:**",
    backgroundPref:  "**Background preference:**",
    fontFeel:        "**Typography feel:**",
    layoutFeel:      "**Layout feel:**",
    inspirations:    "**Style inspirations:**",
    designNotes:     "**Additional design notes:**",
  },
  ja: {
    systemPrompt:    SYSTEM_PROMPT_JA,
    mainTitle:       "# 個人サイト — コンテンツとデザイン",
    mainIntro:       "以下のコンテンツとデザインの好みを参考に、`simple-personal-website-sample` コードベースをカスタマイズしてください。既存のサイト構造とコンポーネントアーキテクチャを維持しながら、すべてのプレースホルダーテキストを以下の内容に置き換えてください。",
    identityH:       "## アイデンティティとブランディング",
    heroH:           "## ヒーローセクション",
    aboutH:          "## 自己紹介セクション",
    projectsH:       "## プロジェクト",
    projectsIntro:   (n: number) => `以下の ${n} 件のプロジェクトで \`src/data/portfolio.json\` の内容を置き換えてください：`,
    postsH:          "## ブログ記事",
    postsIntro:      (n: number) => `以下の ${n} 件の記事で \`posts/\` ディレクトリのサンプル記事を置き換えてください。各記事は適切なフロントマターを含む \`.md\` ファイルとして保存してください。`,
    contactH:        "## お問い合わせセクション",
    designH:         "## デザイン・スタイル",
    designIntro:     "以下のビジュアルデザインの好みを、サイトのTailwind CSSクラス、globals.css、および関連コンポーネントに適用してください：",
    localizationH:   "## ローカライゼーション",
    localizationBody: [
      "このサイトのコンテンツは日本語で書かれています。以下の対応をお願いします：",
      '- ルート要素に `<html lang="ja">` を設定する',
      '- 日本語対応フォントスタックを使用する。Google Fontsから `Noto Sans JP` をメインフォントとして追加し、システムフォントにフォールバックする：`"Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif`',
      '- `<meta charset="UTF-8">` が存在することを確認する',
    ],
    removedH:        "## 削除するセクション",
    removeProjects:  "ポートフォリオ／プロジェクトセクションを完全に削除してください。ポートフォリオページの削除、ホームページのプロジェクトカードの削除、ナビゲーションからのポートフォリオリンクの削除を含みます。",
    removeBlog:      "ブログセクションを完全に削除してください。ブログ一覧ページおよび各記事ページの削除、ホームページのブログプレビューの削除、ナビゲーションからのブログリンクの削除を含みます。",
    footer:          "_コンテンツとスタイルを反映するために必要な変更のみを行ってください。既存のコンポーネント構造、ファイルレイアウト、Next.jsの規約をそのまま維持してください。_",
    // field labels
    name:            "**名前：**",
    role:            "**役割・肩書き：**",
    photo:           "**プロフィール写真：**",
    headline:        "**見出し：**",
    bio:             "**自己紹介：**",
    primaryBtn:      "**メインボタンのラベル：**",
    secondaryBtn:    "**サブボタンのラベル：**",
    para1:           "**段落1：**",
    para2:           "**段落2：**",
    desc:            "**説明：**",
    category:        "**カテゴリー：**",
    techStack:       "**技術スタック：**",
    github:          "**GitHub：**",
    demo:            "**デモ：**",
    featured:        "**ホームページに表示：**",
    yes:             "はい",
    no:              "いいえ",
    date:            "**日付：**",
    excerpt:         "**抜粋：**",
    fullContent:     "**本文：**",
    contactHeading:  "**見出し：**",
    contactIntro:    "**イントロテキスト：**",
    vibe:            "**全体的な雰囲気：**",
    colorPalette:    "**カラーパレット：**",
    accentColor:     "**アクセント・メインカラー：**",
    backgroundPref:  "**背景の設定：**",
    fontFeel:        "**フォントの雰囲気：**",
    layoutFeel:      "**レイアウトの雰囲気：**",
    inspirations:    "**スタイルのインスピレーション：**",
    designNotes:     "**デザインに関する追加メモ：**",
  },
} as const;

// ── Assembler ──────────────────────────────────────────────────────────────────

/**
 * Assembles the AI prompt from form data.
 * All structural headings and field labels are emitted in the chosen language.
 */
export function buildPrompt(form: SiteFormData, lang = "en"): string {
  const L = lang === "ja" ? labels.ja : labels.en;
  const lines: string[] = [];

  // ── System prompt ──────────────────────────────────────────────────────────
  lines.push(L.systemPrompt);

  lines.push(L.mainTitle);
  lines.push("");
  lines.push(L.mainIntro);
  lines.push("");
  lines.push("---");
  lines.push("");

  // ── Identity ────────────────────────────────────────────────────────────────
  lines.push(L.identityH);
  lines.push("");
  if (form.name)      lines.push(`- ${L.name} ${form.name}`);
  if (form.role)      lines.push(`- ${L.role} ${form.role}`);
  if (form.avatarUrl) lines.push(`- ${L.photo} ${form.avatarUrl}`);
  lines.push("");

  // ── Hero ────────────────────────────────────────────────────────────────────
  lines.push(L.heroH);
  lines.push("");
  const headline = form.headline || (form.name ? `Hi, I'm ${form.name}.` : "");
  if (headline)              lines.push(`- ${L.headline} ${headline}`);
  if (form.heroBio)          lines.push(`- ${L.bio} ${form.heroBio}`);
  if (form.primaryBtnLabel)  lines.push(`- ${L.primaryBtn} ${form.primaryBtnLabel}`);
  if (form.secondaryBtnLabel) lines.push(`- ${L.secondaryBtn} ${form.secondaryBtnLabel}`);
  lines.push("");

  // ── About ────────────────────────────────────────────────────────────────────
  lines.push(L.aboutH);
  lines.push("");
  if (form.aboutP1) {
    lines.push(L.para1);
    lines.push(form.aboutP1);
    lines.push("");
  }
  if (form.aboutP2) {
    lines.push(L.para2);
    lines.push(form.aboutP2);
    lines.push("");
  }

  // ── Projects ─────────────────────────────────────────────────────────────────
  if (form.includeProjects) {
    const projects = form.projects.filter((p) => p.title.trim());
    if (projects.length > 0) {
      lines.push(L.projectsH);
      lines.push("");
      lines.push(L.projectsIntro(projects.length));
      lines.push("");
      projects.forEach((p) => {
        lines.push(`### ${p.title}`);
        if (p.description) lines.push(`- ${L.desc} ${p.description}`);
        if (p.category)    lines.push(`- ${L.category} ${p.category}`);
        if (p.techStack)   lines.push(`- ${L.techStack} ${p.techStack}`);
        if (p.githubUrl)   lines.push(`- ${L.github} ${p.githubUrl}`);
        if (p.demoUrl)     lines.push(`- ${L.demo} ${p.demoUrl}`);
        lines.push(`- ${L.featured} ${p.featured ? L.yes : L.no}`);
        lines.push("");
      });
    }
  }

  // ── Blog Posts ───────────────────────────────────────────────────────────────
  if (form.includeBlog) {
    const posts = form.blogPosts.filter((p) => p.title.trim());
    if (posts.length > 0) {
      lines.push(L.postsH);
      lines.push("");
      lines.push(L.postsIntro(posts.length));
      lines.push("");
      posts.forEach((post) => {
        lines.push(`### ${post.title}`);
        if (post.date)    lines.push(`- ${L.date} ${post.date}`);
        if (post.excerpt) lines.push(`- ${L.excerpt} ${post.excerpt}`);
        if (post.content) {
          const truncated = post.content.length > 1000
            ? post.content.slice(0, 1000) + "\n\n[... content truncated for prompt length ...]"
            : post.content;
          lines.push("");
          lines.push(L.fullContent);
          lines.push("");
          lines.push(truncated);
        }
        lines.push("");
      });
    }
  }

  // ── Sections to remove ───────────────────────────────────────────────────────
  const removals = [
    ...(!form.includeProjects ? [L.removeProjects] : []),
    ...(!form.includeBlog     ? [L.removeBlog]     : []),
  ];
  if (removals.length > 0) {
    lines.push(L.removedH);
    lines.push("");
    removals.forEach((item) => lines.push(`- ${item}`));
    lines.push("");
  }

  // ── Contact ──────────────────────────────────────────────────────────────────
  lines.push(L.contactH);
  lines.push("");
  if (form.contactHeading) lines.push(`- ${L.contactHeading} ${form.contactHeading}`);
  if (form.contactIntro)   lines.push(`- ${L.contactIntro} ${form.contactIntro}`);
  lines.push("");

  // ── Design ───────────────────────────────────────────────────────────────────
  lines.push(L.designH);
  lines.push("");
  lines.push(L.designIntro);
  lines.push("");

  const vibe = form.vibeCustom || form.vibe;
  if (vibe)                  lines.push(`- ${L.vibe} ${vibe}`);
  if (form.colorPalette)     lines.push(`- ${L.colorPalette} ${form.colorPalette}`);
  if (form.accentColor)      lines.push(`- ${L.accentColor} ${form.accentColor}`);
  if (form.backgroundPref)   lines.push(`- ${L.backgroundPref} ${form.backgroundPref}`);
  if (form.fontFeel)         lines.push(`- ${L.fontFeel} ${form.fontFeel}`);
  if (form.layoutFeel)       lines.push(`- ${L.layoutFeel} ${form.layoutFeel}`);
  if (form.styleInspirations) lines.push(`- ${L.inspirations} ${form.styleInspirations}`);

  if (form.designNotes) {
    lines.push("");
    lines.push(L.designNotes);
    lines.push(form.designNotes);
  }

  lines.push("");

  // ── Localization (always included for Japanese) ────────────────────────────
  if (lang === "ja") {
    lines.push(L.localizationH);
    lines.push("");
    L.localizationBody.forEach((line) => lines.push(line));
    lines.push("");
  }

  lines.push("---");
  lines.push("");
  lines.push(L.footer);

  return lines.join("\n");
}
