# Personal Site Content Submission App

A simple web app for students to enter their personal content and design preferences, then get a ready-to-use AI prompt for customizing `simple-personal-website-sample`.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Fill in all 7 sections of the form (name, hero, about, projects, blog posts, contact, design)
2. Click **Generate My Prompt**
3. Copy the prompt to your clipboard or download it as a `.md` file
4. Paste the prompt into an AI assistant (Claude, ChatGPT, etc.)
5. The AI customizes your `simple-personal-website-sample` codebase with your content

## File Structure

```
src/
  app/
    page.js              # Main form — all 7 sections, state management, generate button
    layout.js            # HTML shell, shared header and footer
    globals.css          # Tailwind CSS base imports
  components/
    ProjectEntry.jsx     # Repeatable project form card
    BlogPostEntry.jsx    # Repeatable blog post form card
    PromptOutput.jsx     # Displays the generated prompt with copy/download actions
  lib/
    buildPrompt.js       # Pure function: takes form state, returns formatted markdown prompt
```

## Extending the App

- **Add new form fields:** Update `initialForm` in `page.js`, add an input in the relevant section, and add the field to `buildPrompt.js`
- **Change the prompt format:** Edit `src/lib/buildPrompt.js` — it's a single function that returns a markdown string
- **Add more sections:** Follow the `<Section>` pattern in `page.js` and add the corresponding output block in `buildPrompt.js`
