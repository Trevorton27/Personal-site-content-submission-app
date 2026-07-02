/**
 * fill-form.js
 *
 * Paste this entire file into the browser DevTools console while the app is
 * running (npm run dev) and the form page is open. It will populate every
 * field with realistic sample data so you can immediately click
 * "Generate My Prompt" to test prompt generation.
 *
 * Usage:
 *   1. Open http://localhost:3000 and sign in
 *   2. Open DevTools → Console
 *   3. Paste this script and press Enter
 */

(function fillForm() {
  // ── Helpers ────────────────────────────────────────────────────────────────

  /**
   * Set a value on a React-controlled input, textarea, or select.
   * React overrides the native value setter, so we must reach around it
   * via the prototype, then fire the events React listens on.
   */
  function fill(el, value) {
    if (!el) return;
    const proto =
      el.tagName === "TEXTAREA"
        ? HTMLTextAreaElement.prototype
        : el.tagName === "SELECT"
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
    setter.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }

  /** Fill an input/textarea by its placeholder text. */
  function fillByPlaceholder(placeholder, value) {
    const all = document.querySelectorAll("input, textarea, select");
    const el = [...all].find((e) => e.placeholder === placeholder);
    if (!el) {
      console.warn(`fill-form: element not found for placeholder "${placeholder}"`);
      return;
    }
    fill(el, value);
  }

  /**
   * Click a radio button whose adjacent label text starts with the given prefix.
   * Matches the first radio[name=groupName] whose sibling <span> text starts
   * with `textPrefix`.
   */
  function clickRadio(groupName, textPrefix) {
    const labels = [...document.querySelectorAll(`input[type="radio"][name="${groupName}"]`)].map(
      (radio) => radio.closest("label")
    );
    const target = labels.find(
      (lbl) => lbl && lbl.textContent.trim().startsWith(textPrefix)
    );
    if (!target) {
      console.warn(`fill-form: radio not found — name="${groupName}", text starts with "${textPrefix}"`);
      return;
    }
    target.querySelector("input").click();
  }

  /** Click a pill/chip button whose exact trimmed text matches `text`. */
  function clickButton(text) {
    const btn = [...document.querySelectorAll("button")].find(
      (b) => b.textContent.trim() === text
    );
    if (!btn) {
      console.warn(`fill-form: button not found — "${text}"`);
      return;
    }
    btn.click();
  }

  // ── Section 1: Identity ────────────────────────────────────────────────────

  fillByPlaceholder("e.g., Alex Rivera", "Alex Rivera");
  fillByPlaceholder(
    "e.g., Web Developer, CS Student, Aspiring Software Engineer",
    "Full-Stack Developer"
  );
  // Leave email blank or set to a real address if you want to test email delivery
  fillByPlaceholder("you@example.com", "");

  // ── Section 2: Hero ────────────────────────────────────────────────────────

  // Headline — leave blank to let it auto-fill from the name field
  fillByPlaceholder("e.g., Hi, I'm Alex Rivera.", "");

  fillByPlaceholder(
    "e.g., I'm a self-taught web developer learning to build real things on the internet. I write about JavaScript, React, and everything I pick up along the way.",
    "I'm a self-taught developer who went from zero to building full-stack web apps in six weeks. I love JavaScript, React, and shipping things that actually work."
  );

  fillByPlaceholder("See my work", "See my work");
  fillByPlaceholder("Read the blog", "Read the blog");

  // ── Section 3: About ───────────────────────────────────────────────────────

  fillByPlaceholder(
    "e.g., I started learning web development six weeks ago with no prior experience. I now have a working website, a blog, and a few projects I can explain end to end. I'm looking for opportunities to keep building and learning on a team.",
    "I picked up HTML, CSS, and JavaScript six weeks ago with no prior coding experience. Since then I've built a weather app, a todo list with local storage, and this personal site. I can now explain async/await, the DOM, and React hooks without Googling every other word — which feels like a miracle."
  );

  fillByPlaceholder(
    "e.g., When I'm not coding I enjoy hiking and photography. I'm based in Austin, TX.",
    "When I'm not at my keyboard I'm usually hiking with my dog or experimenting with film photography. I'm based in Austin, TX and open to remote opportunities."
  );

  // ── Section 4: Projects ────────────────────────────────────────────────────

  fillByPlaceholder("e.g., Weather Dashboard", "Weather Dashboard");

  fillByPlaceholder(
    "e.g., A weather app that fetches current conditions from a public API. My first project using fetch and async/await.",
    "A responsive weather app that fetches real-time conditions and a 5-day forecast from the OpenWeather API. My first project using fetch and async/await — I learned a lot about error handling and loading states."
  );

  // Category select — find the first <select> on the page
  const categorySelect = document.querySelector("select");
  if (categorySelect) fill(categorySelect, "Web App");

  fillByPlaceholder("HTML, CSS, JavaScript", "HTML, CSS, JavaScript, OpenWeather API");
  fillByPlaceholder("https://github.com/...", "https://github.com/alexrivera/weather-dashboard");
  fillByPlaceholder("https://...", "https://weather.alexrivera.dev");

  // ── Section 5: Blog Posts ──────────────────────────────────────────────────

  fillByPlaceholder(
    "e.g., What I Learned in My First Week of Coding",
    "What I Learned in My First Week of Coding"
  );

  // Date input — query by type="date"
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) fill(dateInput, "2026-06-15");

  fillByPlaceholder(
    "e.g., I had zero coding experience a week ago. Here's what surprised me most.",
    "I had zero coding experience a week ago. Here's what surprised me most about learning to code as an adult."
  );

  fillByPlaceholder(
    "## How It Started\n\nWrite your post here...\n\n## What I Learned\n\n...",
    `## How It Started

A friend showed me a simple webpage he built and I thought: I could do that. Famous last words.

## What I Learned

The gap between "I understand the concept" and "I can actually write it from memory" is enormous. Reading docs is not the same as building things.

## What Surprised Me Most

How fast the feedback loop is. Write a line of JavaScript, open the browser, see it work (or not). No compile step, no build pipeline — just immediate results. That's addictive.

## What's Next

I'm going to keep building small projects until the fundamentals feel automatic. Then I'll tackle a real full-stack app.`
  );

  // ── Section 6: Contact ─────────────────────────────────────────────────────

  fillByPlaceholder("Get in Touch", "Get in Touch");
  fillByPlaceholder(
    "Have a question or want to work together? Send me a message.",
    "Have a question or want to work together? I'd love to hear from you."
  );

  // ── Section 7: Design & Style ──────────────────────────────────────────────

  // Vibe pill button
  clickButton("Clean & minimal");

  fillByPlaceholder("e.g., soft blues and warm whites", "soft blues and warm whites");
  fillByPlaceholder("e.g., teal, #3B82F6, coral", "#3B82F6");

  // Radio groups
  clickRadio("backgroundPref", "Light");
  clickRadio("fontFeel", "Clean sans-serif");
  clickRadio("layoutFeel", "Centered, narrow column");

  fillByPlaceholder(
    "e.g., Linear's website, Stripe's minimalism, Notion's whitespace",
    "Linear's website, Stripe's clean typography, Notion's generous whitespace"
  );

  fillByPlaceholder(
    "e.g., I want it to feel personal, not corporate. Big whitespace. I definitely don't want animations.",
    "I want it to feel personal and approachable, not corporate. Plenty of whitespace. No heavy animations — subtle hover effects are fine."
  );

  console.log("fill-form: all fields populated. Click \"Generate My Prompt\" to test.");
})();
