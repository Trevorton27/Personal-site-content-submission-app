"use client";

import { useState } from "react";
import type { TranslationShape } from "@/types/translations";

type DeviceSize = "mobile" | "tablet" | "desktop";

const deviceWidths: Record<DeviceSize, string> = {
  mobile: "390px",
  tablet: "768px",
  desktop: "100%",
};

interface WebsitePreviewProps {
  html: string;
  loading: boolean;
  error: string;
  onRetry: () => void;
  t: TranslationShape;
}

export default function WebsitePreview({ html, loading, error, onRetry, t }: WebsitePreviewProps) {
  const [device, setDevice] = useState<DeviceSize>("desktop");

  function handleDownload() {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-personal-website.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleOpenNewTab() {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  }

  if (loading) {
    return (
      <div className="border-t-2 border-purple-500 pt-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-300 font-medium">{t.previewGenerating}</p>
        </div>
        <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="border-t-2 border-red-400 pt-8 flex flex-col gap-3">
        <p className="text-red-600 dark:text-red-400 font-medium">{t.previewError}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline self-start"
        >
          {t.previewTryAgain}
        </button>
      </div>
    );
  }

  if (!html) return null;

  return (
    <div className="border-t-2 border-purple-500 pt-8 flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Website Preview</h2>

        <div className="flex items-center gap-2">
          {/* Device toggle */}
          <div className="flex rounded-md border border-gray-300 dark:border-gray-600 overflow-hidden">
            {(["mobile", "tablet", "desktop"] as DeviceSize[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  device === d
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {d === "mobile" ? t.previewDeviceMobile : d === "tablet" ? t.previewDeviceTablet : t.previewDeviceDesktop}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleDownload}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-1.5 px-3 rounded-md text-xs transition-colors"
          >
            {t.downloadHtmlBtn}
          </button>
          <button
            type="button"
            onClick={handleOpenNewTab}
            className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-1.5 px-3 rounded-md text-xs transition-colors"
          >
            {t.openNewTabBtn}
          </button>
        </div>
      </div>

      {/* iframe container */}
      <div className="flex justify-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 p-2 transition-all">
        <iframe
          srcDoc={html}
          sandbox="allow-scripts"
          title="Website Preview"
          style={{ width: deviceWidths[device] }}
          className="h-[600px] border-0 rounded bg-white transition-all duration-300"
        />
      </div>
    </div>
  );
}
