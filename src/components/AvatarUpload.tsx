"use client";

import { useRef, useState, useTransition } from "react";
import { uploadAvatarAction } from "@/actions/uploadAvatar";
import type { TranslationShape } from "@/types/translations";

interface AvatarUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
  t: TranslationShape;
}

export default function AvatarUpload({ currentUrl, onUpload, t }: AvatarUploadProps) {
  const [preview, setPreview] = useState(currentUrl);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setError("");

    startTransition(async () => {
      const fd = new FormData();
      fd.append("file", file);
      if (currentUrl) fd.append("oldUrl", currentUrl);

      const result = await uploadAvatarAction(fd);
      if (result.error) {
        setError(result.error);
        setPreview(currentUrl);
      } else if (result.url) {
        onUpload(result.url);
      }
    });
  }

  function handleRemove() {
    setPreview("");
    onUpload("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      {preview ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="Profile photo"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
        />
      ) : (
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <input
          ref={inputRef}
          id="avatar-upload"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          disabled={isPending}
        />
        <label
          htmlFor="avatar-upload"
          className={`cursor-pointer text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline ${
            isPending ? "opacity-50 cursor-wait" : ""
          }`}
        >
          {isPending ? t.avatarUploading : preview ? t.avatarChange : t.avatarUpload}
        </label>
        {preview && !isPending && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-gray-400 hover:text-red-500 text-left transition-colors"
          >
            {t.avatarRemove}
          </button>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
        <p className="text-xs text-gray-400 dark:text-gray-500">{t.avatarHint}</p>
      </div>
    </div>
  );
}
