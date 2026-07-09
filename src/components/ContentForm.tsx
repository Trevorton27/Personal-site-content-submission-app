"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import ProjectEntry from "@/components/ProjectEntry";
import BlogPostEntry from "@/components/BlogPostEntry";
import PromptOutput from "@/components/PromptOutput";
import AvatarUpload from "@/components/AvatarUpload";
import WebsitePreview from "@/components/WebsitePreview";
import { buildPrompt } from "@/lib/buildPrompt";
import { useApp } from "@/components/AppProviders";
import { translations } from "@/lib/translations";
import { sendFormDataEmailAction, sendPromptEmailAction } from "@/actions/sendEmails";
import { generatePreviewAction } from "@/actions/generatePreview";
import type { SiteFormData, ProjectData, BlogPostData } from "@/types/form";

// ── Initial state ─────────────────────────────────────────────────────────────

const emptyProject = (): ProjectData => ({
  title: "",
  description: "",
  category: "",
  techStack: "",
  githubUrl: "",
  demoUrl: "",
  featured: true,
});

const emptyPost = (): BlogPostData => ({
  title: "",
  date: "",
  excerpt: "",
  content: "",
});

const initialForm: SiteFormData = {
  // Section 1: Identity
  name: "",
  role: "",
  userEmail: "",
  avatarUrl: "",
  // Section 2: Hero
  headline: "",
  heroBio: "",
  primaryBtnLabel: "See my work",
  secondaryBtnLabel: "Read the blog",
  // Section 3: About
  aboutP1: "",
  aboutP2: "",
  // Section 4: Projects
  includeProjects: true,
  projects: [emptyProject()],
  // Section 5: Blog Posts
  includeBlog: true,
  blogPosts: [emptyPost()],
  // Section 6: Contact
  contactHeading: "Get in Touch",
  contactIntro: "Have a question or want to work together? Send me a message.",
  // Section 7: Design
  vibe: "",
  vibeCustom: "",
  colorPalette: "",
  accentColor: "",
  backgroundPref: "",
  fontFeel: "",
  layoutFeel: "",
  styleInspirations: "",
  designNotes: "",
};

// ── Shared style ──────────────────────────────────────────────────────────────

const inputCls =
  "w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

// ── Helper components ─────────────────────────────────────────────────────────

function Section({
  number,
  sectionWord,
  title,
  description,
  children,
}: {
  number: number;
  sectionWord: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-gray-200 dark:border-gray-700 pt-10">
      <div>
        <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1">
          {sectionWord} {number}
        </p>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        {description && (
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{description}</p>
        )}
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
      {children}
    </div>
  );
}

function RadioGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="radio"
            name={name}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="mt-0.5 text-blue-600"
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ── Main form component ───────────────────────────────────────────────────────

export default function ContentForm() {
  const { lang } = useApp();
  const t = translations[lang];
  const { user, isLoaded } = useUser();

  const [form, setForm] = useState<SiteFormData>(initialForm);
  const [prompt, setPrompt] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [previewHtml, setPreviewHtml] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [validationError, setValidationError] = useState("");

  // Pre-populate name + email from Clerk on first load
  useEffect(() => {
    if (!isLoaded || !user) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || (user.fullName ?? ""),
      userEmail: prev.userEmail || (user.primaryEmailAddress?.emailAddress ?? ""),
    }));
  }, [isLoaded, user]);

  // Swap translation-dependent field defaults when language changes.
  // Only replaces values that still match a known language default — preserves user edits.
  useEffect(() => {
    const enT = translations["en"];
    const jaT = translations["ja"];
    const isDefault = (val: string, en: string, ja: string) => val === en || val === ja;
    setForm((prev) => ({
      ...prev,
      primaryBtnLabel: isDefault(prev.primaryBtnLabel, enT.s2PrimaryPlaceholder, jaT.s2PrimaryPlaceholder)
        ? t.s2PrimaryPlaceholder : prev.primaryBtnLabel,
      secondaryBtnLabel: isDefault(prev.secondaryBtnLabel, enT.s2SecondaryPlaceholder, jaT.s2SecondaryPlaceholder)
        ? t.s2SecondaryPlaceholder : prev.secondaryBtnLabel,
      contactHeading: isDefault(prev.contactHeading, enT.s6HeadingPlaceholder, jaT.s6HeadingPlaceholder)
        ? t.s6HeadingPlaceholder : prev.contactHeading,
      contactIntro: isDefault(prev.contactIntro, enT.s6IntroPlaceholder, jaT.s6IntroPlaceholder)
        ? t.s6IntroPlaceholder : prev.contactIntro,
    }));
  }, [lang]);

  // ── State helpers ─────────────────────────────────────────────────────────

  function set(field: keyof SiteFormData, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function setProject(index: number, field: keyof ProjectData, value: string | boolean) {
    setForm((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], [field]: value };
      return { ...prev, projects };
    });
  }

  function addProject() {
    setForm((prev) => ({ ...prev, projects: [...prev.projects, emptyProject()] }));
  }

  function removeProject(index: number) {
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  }

  function setPost(index: number, field: keyof BlogPostData, value: string) {
    setForm((prev) => {
      const blogPosts = [...prev.blogPosts];
      blogPosts[index] = { ...blogPosts[index], [field]: value };
      return { ...prev, blogPosts };
    });
  }

  function addPost() {
    setForm((prev) => ({ ...prev, blogPosts: [...prev.blogPosts, emptyPost()] }));
  }

  function removePost(index: number) {
    setForm((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.filter((_, i) => i !== index),
    }));
  }

  // ── Generate ──────────────────────────────────────────────────────────────

  function validateForm(): string {
    if (!form.name.trim()) return "Please enter your name (Section 1).";
    if (!form.heroBio.trim()) return "Please enter your hero bio (Section 2).";
    if (!form.aboutP1.trim()) return "Please enter your About paragraph (Section 3).";
    return "";
  }

  async function handleGenerate() {
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");

    const generated = buildPrompt(form, lang);
    setPrompt(generated);
    setShowPrompt(true);

    // Fire emails in parallel, fire-and-forget — errors don't surface to UI
    Promise.all([
      sendFormDataEmailAction(form),
      sendPromptEmailAction(generated, form.userEmail, form.name),
    ]).catch(console.error);

    setTimeout(() => {
      document.getElementById("prompt-output")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  // ── Preview ───────────────────────────────────────────────────────────────

  async function handlePreview() {
    if (!prompt) return;
    setPreviewLoading(true);
    setPreviewError("");
    setPreviewHtml("");

    const result = await generatePreviewAction(prompt);
    if ("error" in result && result.error) {
      setPreviewError(result.error);
    } else if (result.html) {
      setPreviewHtml(result.html);
    }
    setPreviewLoading(false);

    setTimeout(() => {
      document.getElementById("website-preview")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-12">

      {/* Intro */}
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t.introHeading}</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {t.introBody1}
          <strong className="text-gray-900 dark:text-gray-100">{t.introBodyStrong}</strong>
          {t.introBody2}
        </p>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {t.requiredPre}
          <span className="text-red-500">*</span>
          {t.requiredPost}
        </p>
      </div>

      {/* ── Section 1: Identity ───────────────────────────────────────────────── */}
      <Section
        number={1}
        sectionWord={t.sectionWord}
        title={t.s1Title}
        description={t.s1Desc}
      >
        <Field label={t.s1NameLabel} required>
          <input
            type="text"
            placeholder={t.s1NamePlaceholder}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.s1RoleLabel}>
          <input
            type="text"
            placeholder={t.s1RolePlaceholder}
            value={form.role}
            onChange={(e) => set("role", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.s1EmailLabel} hint={t.s1EmailHint}>
          <input
            type="email"
            placeholder={t.s1EmailPlaceholder}
            value={form.userEmail}
            onChange={(e) => set("userEmail", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.s1AvatarLabel}>
          <AvatarUpload
            currentUrl={form.avatarUrl}
            onUpload={(url) => set("avatarUrl", url)}
            t={t}
          />
        </Field>
      </Section>

      {/* ── Section 2: Hero ───────────────────────────────────────────────────── */}
      <Section
        number={2}
        sectionWord={t.sectionWord}
        title={t.s2Title}
        description={t.s2Desc}
      >
        <Field label={t.s2HeadlineLabel} hint={t.s2HeadlineHint}>
          <input
            type="text"
            placeholder={t.s2HeadlinePlaceholderFn(form.name)}
            value={form.headline}
            onChange={(e) => set("headline", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.s2BioLabel} hint={t.s2BioHint} required>
          <textarea
            rows={3}
            placeholder={t.s2BioPlaceholder}
            value={form.heroBio}
            onChange={(e) => set("heroBio", e.target.value)}
            className={inputCls}
          />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label={t.s2PrimaryLabel} hint={t.s2PrimaryHint}>
            <input
              type="text"
              placeholder={t.s2PrimaryPlaceholder}
              value={form.primaryBtnLabel}
              onChange={(e) => set("primaryBtnLabel", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label={t.s2SecondaryLabel} hint={t.s2SecondaryHint}>
            <input
              type="text"
              placeholder={t.s2SecondaryPlaceholder}
              value={form.secondaryBtnLabel}
              onChange={(e) => set("secondaryBtnLabel", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </Section>

      {/* ── Section 3: About ──────────────────────────────────────────────────── */}
      <Section
        number={3}
        sectionWord={t.sectionWord}
        title={t.s3Title}
        description={t.s3Desc}
      >
        <Field label={t.s3P1Label} required>
          <textarea
            rows={4}
            placeholder={t.s3P1Placeholder}
            value={form.aboutP1}
            onChange={(e) => set("aboutP1", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.s3P2Label}>
          <textarea
            rows={2}
            placeholder={t.s3P2Placeholder}
            value={form.aboutP2}
            onChange={(e) => set("aboutP2", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* ── Section 4: Projects ───────────────────────────────────────────────── */}
      <Section
        number={4}
        sectionWord={t.sectionWord}
        title={t.s4Title}
        description={t.s4Desc}
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.includeProjects}
            onChange={(e) => set("includeProjects", e.target.checked)}
            className="rounded text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.s4IncludeLabel}</span>
        </label>
        {!form.includeProjects && (
          <p className="text-sm text-amber-600 dark:text-amber-400">{t.s4SkipNote}</p>
        )}
        {form.includeProjects && (
          <>
            {form.projects.map((project, i) => (
              <ProjectEntry
                key={i}
                index={i}
                project={project}
                t={t}
                onChange={(field, value) => setProject(i, field, value)}
                onRemove={form.projects.length > 1 ? () => removeProject(i) : null}
              />
            ))}
            {form.projects.length < 5 && (
              <button
                type="button"
                onClick={addProject}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium text-left"
              >
                {t.addProject}
              </button>
            )}
          </>
        )}
      </Section>

      {/* ── Section 5: Blog Posts ─────────────────────────────────────────────── */}
      <Section
        number={5}
        sectionWord={t.sectionWord}
        title={t.s5Title}
        description={t.s5Desc}
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={form.includeBlog}
            onChange={(e) => set("includeBlog", e.target.checked)}
            className="rounded text-blue-600"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.s5IncludeLabel}</span>
        </label>
        {!form.includeBlog && (
          <p className="text-sm text-amber-600 dark:text-amber-400">{t.s5SkipNote}</p>
        )}
        {form.includeBlog && (
          <>
            {form.blogPosts.map((post, i) => (
              <BlogPostEntry
                key={i}
                index={i}
                post={post}
                t={t}
                onChange={(field, value) => setPost(i, field, value)}
                onRemove={form.blogPosts.length > 1 ? () => removePost(i) : null}
              />
            ))}
            {form.blogPosts.length < 3 && (
              <button
                type="button"
                onClick={addPost}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium text-left"
              >
                {t.addPost}
              </button>
            )}
          </>
        )}
      </Section>

      {/* ── Section 6: Contact ────────────────────────────────────────────────── */}
      <Section
        number={6}
        sectionWord={t.sectionWord}
        title={t.s6Title}
        description={t.s6Desc}
      >
        <Field label={t.s6HeadingLabel}>
          <input
            type="text"
            placeholder={t.s6HeadingPlaceholder}
            value={form.contactHeading}
            onChange={(e) => set("contactHeading", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.s6IntroLabel}>
          <input
            type="text"
            placeholder={t.s6IntroPlaceholder}
            value={form.contactIntro}
            onChange={(e) => set("contactIntro", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* ── Section 7: Design ─────────────────────────────────────────────────── */}
      <Section
        number={7}
        sectionWord={t.sectionWord}
        title={t.s7Title}
        description={t.s7Desc}
      >
        <Field label={t.s7VibeLabel}>
          <div className="flex flex-wrap gap-2 mb-2">
            {t.vibes.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => set("vibe", form.vibe === v ? "" : v)}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  form.vibe === v
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-400 dark:hover:border-blue-500"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder={t.s7VibeCustomPlaceholder}
            value={form.vibeCustom}
            onChange={(e) => set("vibeCustom", e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label={t.s7ColorLabel} hint={t.s7ColorHint}>
            <input
              type="text"
              placeholder={t.s7ColorPlaceholder}
              value={form.colorPalette}
              onChange={(e) => set("colorPalette", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label={t.s7AccentLabel} hint={t.s7AccentHint}>
            <input
              type="text"
              placeholder={t.s7AccentPlaceholder}
              value={form.accentColor}
              onChange={(e) => set("accentColor", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <Field label={t.s7BgLabel}>
          <RadioGroup
            name="backgroundPref"
            options={t.bgPrefs}
            value={form.backgroundPref}
            onChange={(v) => set("backgroundPref", v)}
          />
        </Field>

        <Field label={t.s7FontLabel}>
          <RadioGroup
            name="fontFeel"
            options={t.fontFeels}
            value={form.fontFeel}
            onChange={(v) => set("fontFeel", v)}
          />
        </Field>

        <Field label={t.s7LayoutLabel}>
          <RadioGroup
            name="layoutFeel"
            options={t.layoutFeels}
            value={form.layoutFeel}
            onChange={(v) => set("layoutFeel", v)}
          />
        </Field>

        <Field label={t.s7InspirationLabel} hint={t.s7InspirationHint}>
          <textarea
            rows={2}
            placeholder={t.s7InspirationPlaceholder}
            value={form.styleInspirations}
            onChange={(e) => set("styleInspirations", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label={t.s7NotesLabel}>
          <textarea
            rows={3}
            placeholder={t.s7NotesPlaceholder}
            value={form.designNotes}
            onChange={(e) => set("designNotes", e.target.value)}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* ── Generate button ───────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700 pt-10">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t.generateNote}</p>
        {validationError && (
          <p className="text-sm text-red-500">{validationError}</p>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleGenerate}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg text-lg transition-colors"
          >
            {t.generateBtn}
          </button>
          {showPrompt && (
            <button
              type="button"
              onClick={handlePreview}
              disabled={previewLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-4 px-10 rounded-lg text-lg transition-colors"
            >
              {previewLoading ? t.previewGenerating : t.generatePreviewBtn}
            </button>
          )}
        </div>
      </div>

      {/* ── Prompt output ─────────────────────────────────────────────────────── */}
      {showPrompt && (
        <div id="prompt-output">
          <PromptOutput prompt={prompt} t={t} />
        </div>
      )}

      {/* ── Website preview ───────────────────────────────────────────────────── */}
      {(previewLoading || previewHtml || previewError) && (
        <div id="website-preview">
          <WebsitePreview
            html={previewHtml}
            loading={previewLoading}
            error={previewError}
            onRetry={handlePreview}
            t={t}
          />
        </div>
      )}
    </main>
  );
}
