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

export default function BlogPostEntry({ index, post, t, onChange, onRemove }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-5 bg-white dark:bg-gray-800 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 dark:text-gray-200">
          {t.postCardTitle(index)}
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

      <Field label={t.postTitleLabel} required>
        <input
          type="text"
          placeholder={t.postTitlePlaceholder}
          value={post.title}
          onChange={(e) => onChange("title", e.target.value)}
          className={inputCls}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label={t.postDateLabel}>
          <input
            type="date"
            value={post.date}
            onChange={(e) => onChange("date", e.target.value)}
            className={inputCls}
          />
        </Field>
      </div>

      <Field label={t.postExcerptLabel} hint={t.postExcerptHint}>
        <textarea
          rows={2}
          placeholder={t.postExcerptPlaceholder}
          value={post.excerpt}
          onChange={(e) => onChange("excerpt", e.target.value)}
          className={inputCls}
        />
      </Field>

      <Field label={t.postContentLabel} hint={t.postContentHint}>
        <textarea
          rows={10}
          placeholder={t.postContentPlaceholder}
          value={post.content}
          onChange={(e) => onChange("content", e.target.value)}
          className={`${inputCls} font-mono`}
        />
      </Field>
    </div>
  );
}
