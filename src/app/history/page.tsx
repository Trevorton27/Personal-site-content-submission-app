import { listPromptsAction } from "@/actions/promptHistory";
import PromptHistoryList from "@/components/PromptHistoryList";

export default async function HistoryPage() {
  const result = await listPromptsAction();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Prompt History
      </h1>
      {result.error ? (
        <p className="text-sm text-red-500">{result.error}</p>
      ) : (
        <PromptHistoryList prompts={result.prompts ?? []} />
      )}
    </main>
  );
}
