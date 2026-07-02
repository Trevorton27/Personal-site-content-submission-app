# Personal Site Content Submission App

A web app for students to enter their personal content and design preferences, generate a ready-to-use AI prompt for customizing `simple-personal-website-sample`, and preview what their site will look like.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Resend email
RESEND_API_KEY=
EMAIL_FROM=           # Sender address (e.g. noreply@yourdomain.com)
EMAIL_ADMIN=          # Admin address to receive all submissions

# Vercel Blob (avatar uploads)
BLOB_READ_WRITE_TOKEN=

# Anthropic (AI preview generation)
ANTHROPIC_API_KEY=
```

## Features

### Authentication
All routes are protected by [Clerk](https://clerk.com). Users must sign in or sign up before accessing the form. Name and email are pre-populated from the Clerk user profile.

### 7-Section Content Form

| # | Section | Fields |
|---|---------|--------|
| 1 | **Identity** | Name, role/title, email, avatar photo |
| 2 | **Hero** | Headline, bio, primary and secondary CTA button labels |
| 3 | **About** | Two biography paragraphs |
| 4 | **Projects** | Up to 5 projects — title, description, category, tech stack, GitHub URL, demo URL, featured flag |
| 5 | **Blog Posts** | Up to 3 posts — title, date, excerpt, full content |
| 6 | **Contact** | Section heading and intro text |
| 7 | **Design** | Vibe preset + custom vibe, color palette, accent color, background preference, font feel, layout feel, style inspirations, free-form notes |

### Avatar Upload
Upload a profile photo (JPEG, PNG, or WebP, max 4 MB). Images are stored in [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) and scoped per user.

### Prompt Generation
Click **Generate My Prompt** to build a formatted Markdown prompt from your form data. The prompt output panel lets you:
- Copy the prompt to clipboard
- Download it as a `.md` file

The generated prompt (and raw form data) are also emailed to the admin via [Resend](https://resend.com). If the user provided an email address, they receive a copy of their prompt too.

### AI Website Preview
After generating a prompt, click **Preview My Website** to have Claude (Haiku) render a live single-file HTML preview of your personal site based on your content and design choices.

The preview panel includes:
- **Device toggle** — switch between mobile (390 px), tablet (768 px), and desktop views
- **Download HTML** — save the generated page as `my-personal-website.html`
- **Open in new tab** — view the preview full-screen in a new browser tab

Preview generation is rate-limited to once per 5 minutes per user.

### Internationalization
UI text is driven by a translation layer (`src/lib/translations.ts`), making it straightforward to add additional languages.

### Dark Mode
Full dark-mode support throughout the app.

## How It Works

1. Sign in or create an account
2. Fill in the 7 sections of the form
3. Click **Generate My Prompt**
4. Optionally click **Preview My Website** to see an AI-rendered preview
5. Copy or download the prompt and paste it into Claude (or another AI assistant)
6. The AI customizes your `simple-personal-website-sample` codebase with your content

## File Structure

```
src/
  app/
    layout.tsx                    # HTML shell with Clerk + AppProviders, TopBar, FooterBar
    page.tsx                      # Entry point — renders ContentForm
    sign-in/                      # Clerk hosted sign-in page
    sign-up/                      # Clerk hosted sign-up page
    globals.css                   # Tailwind CSS base imports
  actions/
    generatePreview.ts            # Server action: calls Claude Haiku to render preview HTML
    sendEmails.ts                 # Server actions: email form data + prompt via Resend
    uploadAvatar.ts               # Server action: upload avatar to Vercel Blob
  components/
    ContentForm.tsx               # Main form — all 7 sections, state, generate + preview buttons
    ProjectEntry.tsx              # Repeatable project card
    BlogPostEntry.tsx             # Repeatable blog post card
    PromptOutput.tsx              # Displays generated prompt with copy/download actions
    WebsitePreview.tsx            # Renders preview iframe with device toggle + download
    AvatarUpload.tsx              # Avatar upload input with preview
    TopBar.tsx                    # App header with language selector and user button
    FooterBar.tsx                 # App footer
    AppProviders.tsx              # Context provider (theme, language)
    emails/
      FormDataEmail.tsx           # React Email template for raw form data
      PromptEmail.tsx             # React Email template for generated prompt
  lib/
    buildPrompt.ts                # Pure function: form state -> formatted Markdown prompt
    systemPrompt.ts               # System prompt for Claude preview generation
    translations.ts               # EN (and other language) UI strings
  types/
    form.ts                       # SiteFormData, ProjectData, BlogPostData types
    translations.ts               # TranslationShape type
middleware.ts                     # Clerk auth middleware — protects all non-public routes
```

## Extending the App

- **Add new form fields:** Update `SiteFormData` in `src/types/form.ts`, add the input in `ContentForm.tsx`, and add the field to `src/lib/buildPrompt.ts`
- **Change the prompt format:** Edit `src/lib/buildPrompt.ts` — it's a single pure function that returns a Markdown string
- **Add a new language:** Add a new entry in `src/lib/translations.ts` and wire it into `AppProviders.tsx`
- **Change the preview model:** Update the model in `src/actions/generatePreview.ts`
