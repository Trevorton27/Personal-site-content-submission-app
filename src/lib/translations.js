export const translations = {
  en: {
    // TopBar
    siteTitle: "Personal Website Builder",
    siteTagline: "Fill in your content. Generate your prompt. Build your site.",
    langToggleLabel: "日本語",
    themeLightLabel: "🌙",
    themeDarkLabel: "☀️",

    // Footer
    footerText: "Built for the personal website course.",

    // Intro
    introHeading: "Build Your Personal Site",
    introBody1: "Fill in each section below with your own content and style preferences. When you are done, click ",
    introBodyStrong: "Generate My Prompt",
    introBody2: " at the bottom. You will get a ready-to-paste prompt that tells an AI exactly how to customize your personal website.",
    requiredPre: "Fields marked with ",
    requiredPost: " are required. Everything else is optional but encouraged.",

    // Section label word
    sectionWord: "Section",

    // Section 1
    s1Title: "Your Name & Identity",
    s1Desc: "Appears in the site header (top-left), the hero heading, and the footer.",
    s1NameLabel: "Full name or display name",
    s1NamePlaceholder: "e.g., Alex Rivera",
    s1RoleLabel: "Professional title or role",
    s1RolePlaceholder: "e.g., Web Developer, CS Student, Aspiring Software Engineer",

    // Section 2
    s2Title: "Hero — First Impression",
    s2Desc: "The bold opening of your homepage: a greeting, a short bio, and two buttons.",
    s2HeadlineLabel: "Headline",
    s2HeadlineHint: `Customizes the "Hi, I'm Your Name" line. Leave blank to auto-fill from your name.`,
    s2HeadlinePlaceholderFn: (name) => name ? `Hi, I'm ${name}.` : "e.g., Hi, I'm Alex Rivera.",
    s2BioLabel: "Short intro paragraph",
    s2BioHint: "1–3 sentences. Who are you and what are you building / learning?",
    s2BioPlaceholder: "e.g., I'm a self-taught web developer learning to build real things on the internet. I write about JavaScript, React, and everything I pick up along the way.",
    s2PrimaryLabel: "Primary button label",
    s2PrimaryHint: "Links to your Portfolio page",
    s2PrimaryPlaceholder: "See my work",
    s2SecondaryLabel: "Secondary button label",
    s2SecondaryHint: "Links to your Blog page",
    s2SecondaryPlaceholder: "Read the blog",

    // Section 3
    s3Title: "About",
    s3Desc: "1–2 paragraphs about your background and personal side.",
    s3P1Label: "Paragraph 1 — Your coding background / journey",
    s3P1Placeholder: "e.g., I started learning web development six weeks ago with no prior experience. I now have a working website, a blog, and a few projects I can explain end to end. I'm looking for opportunities to keep building and learning on a team.",
    s3P2Label: "Paragraph 2 — Personal interests & location",
    s3P2Placeholder: "e.g., When I'm not coding I enjoy hiking and photography. I'm based in Austin, TX.",

    // Section 4
    s4Title: "Projects",
    s4Desc: "Add 1–5 projects. Featured ones appear on the homepage; all appear on the Portfolio page.",
    addProject: "+ Add another project",

    // Section 5
    s5Title: "Blog Posts",
    s5Desc: "Add 1–3 posts. The 3 most recent appear on your homepage.",
    addPost: "+ Add another post",

    // Section 6
    s6Title: "Contact",
    s6Desc: 'The "Get in Touch" section at the bottom of your homepage.',
    s6HeadingLabel: "Section heading",
    s6HeadingPlaceholder: "Get in Touch",
    s6IntroLabel: "Intro text",
    s6IntroPlaceholder: "Have a question or want to work together? Send me a message.",

    // Section 7
    s7Title: "Design & Style",
    s7Desc: "Tell us how you want your site to look and feel. These preferences will guide the AI's visual choices.",
    s7VibeLabel: "Overall vibe",
    s7VibeCustomPlaceholder: "Or describe your own vibe...",
    s7ColorLabel: "Color palette",
    s7ColorHint: '"e.g., "navy and gold", "earth tones", "black and white"',
    s7ColorPlaceholder: "e.g., soft blues and warm whites",
    s7AccentLabel: "Accent / primary color",
    s7AccentHint: "Used for buttons, links, and highlights",
    s7AccentPlaceholder: "e.g., teal, #3B82F6, coral",
    s7BgLabel: "Background preference",
    s7FontLabel: "Typography / font feel",
    s7LayoutLabel: "Layout feel",
    s7InspirationLabel: "Style inspirations",
    s7InspirationHint: "Websites, designers, or brands you admire",
    s7InspirationPlaceholder: "e.g., Linear's website, Stripe's minimalism, Notion's whitespace",
    s7NotesLabel: "Anything else the AI should know about your design?",
    s7NotesPlaceholder: "e.g., I want it to feel personal, not corporate. Big whitespace. I definitely don't want animations.",

    // Generate
    generateNote: "All done? Click below to generate your AI prompt.",
    generateBtn: "Generate My Prompt",

    // Vibes / options
    vibes: [
      "Clean & minimal",
      "Bold & modern",
      "Warm & personal",
      "Dark & technical",
      "Colorful & creative",
      "Professional & corporate",
    ],
    bgPrefs: [
      "Light — white or off-white background",
      "Dark — dark gray or black background",
      "System — respect the user's OS preference (dark mode toggle)",
    ],
    fontFeels: [
      "Clean sans-serif — modern, easy to read",
      "Elegant serif — classic, editorial",
      "Monospace / code-y — technical personality",
      "Mixed — serif headings with sans-serif body",
    ],
    layoutFeels: [
      "Centered, narrow column — focused and minimal",
      "Full-width sections — bold and spacious",
      "Card-heavy — lots of bordered boxes",
      "List-based — clean and scannable",
    ],

    // ProjectEntry
    projectCardTitle: (i) => `Project ${i + 1}`,
    removeBtn: "Remove",
    projectTitleLabel: "Title",
    projectTitlePlaceholder: "e.g., Weather Dashboard",
    projectDescLabel: "Description",
    projectDescHint: "1–3 sentences. What is it? What did you learn?",
    projectDescPlaceholder: "e.g., A weather app that fetches current conditions from a public API. My first project using fetch and async/await.",
    projectCategoryLabel: "Category",
    projectCategoryDefault: "Select...",
    projectCategories: ["Web App", "Mobile App", "Tool", "Game", "Design", "Other"],
    projectTechLabel: "Tech stack",
    projectTechHint: "Comma-separated",
    projectTechPlaceholder: "HTML, CSS, JavaScript",
    projectGithubLabel: "GitHub URL",
    projectGithubPlaceholder: "https://github.com/...",
    projectDemoLabel: "Live demo URL",
    projectDemoPlaceholder: "https://...",
    projectFeaturedLabel: "Show this project on the homepage",

    // BlogPostEntry
    postCardTitle: (i) => `Post ${i + 1}`,
    postTitleLabel: "Title",
    postTitlePlaceholder: "e.g., What I Learned in My First Week of Coding",
    postDateLabel: "Date",
    postExcerptLabel: "Excerpt",
    postExcerptHint: "1–2 sentence teaser shown on listing pages",
    postExcerptPlaceholder: "e.g., I had zero coding experience a week ago. Here's what surprised me most.",
    postContentLabel: "Full post content",
    postContentHint: "Write freely. Markdown is supported — use ## for headings, `code` for inline code, ``` for code blocks.",
    postContentPlaceholder: "## How It Started\n\nWrite your post here...\n\n## What I Learned\n\n...",

    // PromptOutput
    promptReady: "Your Prompt is Ready",
    promptDesc: "Copy the prompt below and paste it into Claude, ChatGPT, or another AI assistant. It will customize your personal website with everything you entered above.",
    copyBtn: "Copy to clipboard",
    copiedBtn: "Copied!",
    downloadBtn: "Download as .md",
  },

  ja: {
    // TopBar
    siteTitle: "個人サイトビルダー",
    siteTagline: "内容を入力してプロンプトを生成し、サイトを作ろう。",
    langToggleLabel: "English",
    themeLightLabel: "🌙",
    themeDarkLabel: "☀️",

    // Footer
    footerText: "個人サイトコース用に作成。",

    // Intro
    introHeading: "個人サイトを作ろう",
    introBody1: "以下の各セクションにあなたのコンテンツとスタイルの好みを入力してください。完了したら一番下の",
    introBodyStrong: "プロンプトを生成する",
    introBody2: "をクリックしてください。AIがあなたの個人サイトをカスタマイズするためのプロンプトが生成されます。",
    requiredPre: "",
    requiredPost: "が付いているフィールドは必須です。それ以外は任意ですが、入力することをお勧めします。",

    // Section label word
    sectionWord: "セクション",

    // Section 1
    s1Title: "名前とアイデンティティ",
    s1Desc: "サイトのヘッダー（左上）、ヒーロー見出し、フッターに表示されます。",
    s1NameLabel: "フルネームまたは表示名",
    s1NamePlaceholder: "例：山田 太郎",
    s1RoleLabel: "職業・役割",
    s1RolePlaceholder: "例：Webデベロッパー、CS学生、ソフトウェアエンジニア志望",

    // Section 2
    s2Title: "ヒーロー — 第一印象",
    s2Desc: "ホームページの冒頭：挨拶、短い自己紹介、2つのボタン。",
    s2HeadlineLabel: "見出し",
    s2HeadlineHint: "「こんにちは、〇〇です」の部分をカスタマイズします。空白にすると名前から自動入力されます。",
    s2HeadlinePlaceholderFn: (name) => name ? `こんにちは、${name}です。` : "例：こんにちは、山田太郎です。",
    s2BioLabel: "短い自己紹介文",
    s2BioHint: "1〜3文。あなたは誰で、何を作っているまたは学んでいますか？",
    s2BioPlaceholder: "例：独学でWeb開発を学んでいます。JavaScriptやReactについて学んだことをブログに書いています。",
    s2PrimaryLabel: "メインボタンのラベル",
    s2PrimaryHint: "ポートフォリオページへのリンク",
    s2PrimaryPlaceholder: "作品を見る",
    s2SecondaryLabel: "サブボタンのラベル",
    s2SecondaryHint: "ブログページへのリンク",
    s2SecondaryPlaceholder: "ブログを読む",

    // Section 3
    s3Title: "自己紹介",
    s3Desc: "バックグラウンドや個人的な側面について1〜2段落。",
    s3P1Label: "段落1 — コーディングの背景・歩み",
    s3P1Placeholder: "例：6週間前に全くの初心者としてWeb開発を始めました。今では動くウェブサイト、ブログ、いくつかのプロジェクトを持っています。チームで学び続ける機会を探しています。",
    s3P2Label: "段落2 — 趣味・居住地",
    s3P2Placeholder: "例：コーディング以外では、ハイキングや写真撮影を楽しんでいます。東京在住です。",

    // Section 4
    s4Title: "プロジェクト",
    s4Desc: "1〜5つのプロジェクトを追加。注目プロジェクトはホームページに、すべてはポートフォリオページに表示されます。",
    addProject: "+ プロジェクトを追加",

    // Section 5
    s5Title: "ブログ記事",
    s5Desc: "1〜3記事を追加。最新の3記事がホームページに表示されます。",
    addPost: "+ 記事を追加",

    // Section 6
    s6Title: "お問い合わせ",
    s6Desc: "ホームページ下部の「お問い合わせ」セクション。",
    s6HeadingLabel: "セクション見出し",
    s6HeadingPlaceholder: "お問い合わせ",
    s6IntroLabel: "イントロテキスト",
    s6IntroPlaceholder: "ご質問やお仕事のご相談はこちらからどうぞ。",

    // Section 7
    s7Title: "デザイン・スタイル",
    s7Desc: "サイトの見た目や雰囲気を教えてください。AIのビジュアル選択に使われます。",
    s7VibeLabel: "全体的な雰囲気",
    s7VibeCustomPlaceholder: "または自分の言葉で雰囲気を説明してください...",
    s7ColorLabel: "カラーパレット",
    s7ColorHint: '例：「ネイビーとゴールド」「アースカラー」「白黒」',
    s7ColorPlaceholder: "例：ソフトブルーと温かみのあるホワイト",
    s7AccentLabel: "アクセント・メインカラー",
    s7AccentHint: "ボタン、リンク、ハイライトに使用",
    s7AccentPlaceholder: "例：ティール、#3B82F6、コーラル",
    s7BgLabel: "背景の設定",
    s7FontLabel: "フォントの雰囲気",
    s7LayoutLabel: "レイアウトの雰囲気",
    s7InspirationLabel: "スタイルのインスピレーション",
    s7InspirationHint: "参考にしたいウェブサイト、デザイナー、ブランド",
    s7InspirationPlaceholder: "例：Linearのウェブサイト、Stripeのミニマリズム、Notionの余白感",
    s7NotesLabel: "デザインについてAIに伝えたいことはありますか？",
    s7NotesPlaceholder: "例：コーポレートではなく個人的な雰囲気にしたい。余白を多めに。アニメーションは不要。",

    // Generate
    generateNote: "すべて入力できましたか？下のボタンをクリックしてプロンプトを生成してください。",
    generateBtn: "プロンプトを生成する",

    // Vibes / options
    vibes: [
      "クリーン＆ミニマル",
      "ボールド＆モダン",
      "ウォーム＆パーソナル",
      "ダーク＆テクニカル",
      "カラフル＆クリエイティブ",
      "プロフェッショナル＆コーポレート",
    ],
    bgPrefs: [
      "ライト — 白またはオフホワイトの背景",
      "ダーク — ダークグレーまたは黒の背景",
      "システム — OSの設定に合わせる（ダークモード対応）",
    ],
    fontFeels: [
      "クリーンなサンセリフ — モダンで読みやすい",
      "エレガントなセリフ — クラシックで上品",
      "モノスペース — 技術的な個性",
      "ミックス — 見出しにセリフ、本文にサンセリフ",
    ],
    layoutFeels: [
      "中央寄せ・細いカラム — シンプルで集中しやすい",
      "フル幅セクション — 大胆でスペーシャス",
      "カード多用 — 枠で囲まれたボックス",
      "リストベース — クリーンでスキャンしやすい",
    ],

    // ProjectEntry
    projectCardTitle: (i) => `プロジェクト ${i + 1}`,
    removeBtn: "削除",
    projectTitleLabel: "タイトル",
    projectTitlePlaceholder: "例：天気ダッシュボード",
    projectDescLabel: "説明",
    projectDescHint: "1〜3文。何を作ったか？何を学んだか？",
    projectDescPlaceholder: "例：公開APIから天気情報を取得するアプリ。fetchとasync/awaitを初めて使ったプロジェクト。",
    projectCategoryLabel: "カテゴリー",
    projectCategoryDefault: "選択...",
    projectCategories: ["Webアプリ", "モバイルアプリ", "ツール", "ゲーム", "デザイン", "その他"],
    projectTechLabel: "技術スタック",
    projectTechHint: "カンマ区切り",
    projectTechPlaceholder: "HTML, CSS, JavaScript",
    projectGithubLabel: "GitHub URL",
    projectGithubPlaceholder: "https://github.com/...",
    projectDemoLabel: "ライブデモURL",
    projectDemoPlaceholder: "https://...",
    projectFeaturedLabel: "このプロジェクトをホームページに表示する",

    // BlogPostEntry
    postCardTitle: (i) => `記事 ${i + 1}`,
    postTitleLabel: "タイトル",
    postTitlePlaceholder: "例：コーディング最初の1週間で学んだこと",
    postDateLabel: "日付",
    postExcerptLabel: "抜粋",
    postExcerptHint: "一覧ページに表示される1〜2文のティーザー",
    postExcerptPlaceholder: "例：1週間前はコーディング経験ゼロでした。一番驚いたことを紹介します。",
    postContentLabel: "記事本文",
    postContentHint: "自由に書いてください。Markdownに対応しています — ##で見出し、`コード`でインラインコード、```でコードブロック。",
    postContentPlaceholder: "## はじめに\n\nここに記事を書いてください...\n\n## 学んだこと\n\n...",

    // PromptOutput
    promptReady: "プロンプトが完成しました",
    promptDesc: "以下のプロンプトをコピーして、Claude、ChatGPT、またはその他のAIアシスタントに貼り付けてください。入力した内容をもとに個人サイトをカスタマイズしてくれます。",
    copyBtn: "クリップボードにコピー",
    copiedBtn: "コピーしました！",
    downloadBtn: ".mdとしてダウンロード",
  },
};
