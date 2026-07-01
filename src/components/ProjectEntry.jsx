"use client";

const inputCls =
  "w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";

function Field({ label, hint, required, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
      {children}
    </div>
  );
}

export default function ProjectEntry({ index, project, t, onChange, onRemove }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
          {t.projectCardTitle(index)}
        </h3>
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-sm text-red-500 hover:text-red-600"
          >
            {t.removeBtn}
          </button>
        )}
      </div>

      <Field label={t.projectTitleLabel} required>
        <input
          type="text"
          placeholder={t.projectTitlePlaceholder}
          value={project.title}
          onChange={(e) => onChange("title", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label={t.projectDescLabel} hint={t.projectDescHint}>
        <textarea
          rows={2}
          placeholder={t.projectDescPlaceholder}
          value={project.description}
          onChange={(e) => onChange("description", e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label={t.projectCategoryLabel}>
          <select
            value={project.category}
            onChange={(e) => onChange("category", e.target.value)}
            className={inputCls}
          >
            <option value="">{t.projectCategoryDefault}</option>
            {t.projectCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.projectTechLabel} hint={t.projectTechHint}>
          <input
            type="text"
            placeholder={t.projectTechPlaceholder}
            value={project.techStack}
            onChange={(e) => onChange("techStack", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label={t.projectGithubLabel}>
          <input
            type="url"
            placeholder={t.projectGithubPlaceholder}
            value={project.githubUrl}
            onChange={(e) => onChange("githubUrl", e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label={t.projectDemoLabel}>
          <input
            type="url"
            placeholder={t.projectDemoPlaceholder}
            value={project.demoUrl}
            onChange={(e) => onChange("demoUrl", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={project.featured}
          onChange={(e) => onChange("featured", e.target.checked)}
          className="rounded text-blue-600"
        />
        <span className="text-sm text-gray-700 dark:text-gray-300">{t.projectFeaturedLabel}</span>
      </label>
    </div>
  );
}
