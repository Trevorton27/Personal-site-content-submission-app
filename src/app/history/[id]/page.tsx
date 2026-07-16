import { notFound } from "next/navigation";
import Link from "next/link";
import { getPromptAction } from "@/actions/promptHistory";
import PromptActions from "@/components/PromptActions";
import PromptTimestamp from "@/components/PromptTimestamp";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PromptDetailPage({ params }: Props) {
  const { id } = await params;
  const result = await getPromptAction(id);

  if (result.error || !result.prompt) notFound();

  const prompt = result.prompt;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-8">
      <div>
        <Link
          href="/history"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to History
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
          {prompt.title}
        </h1>
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>Version {prompt.version}</span>
          <span>·</span>
          <span>
            Created: <PromptTimestamp iso={prompt.createdAt} />
          </span>
        </div>
      </div>

      <PromptActions
        content={prompt.content}
        promptId={prompt.id}
        filename={`prompt-v${prompt.version}`}
      />

      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-6 text-xs leading-relaxed overflow-auto max-h-[600px] whitespace-pre-wrap font-mono">
        {prompt.content}
      </pre>
    </main>
  );
}
