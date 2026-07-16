export function downloadPromptAs(
  content: string,
  format: "md" | "txt",
  filename: string
) {
  const mimeType = format === "md" ? "text/markdown" : "text/plain";
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}
