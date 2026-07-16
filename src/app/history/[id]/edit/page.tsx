import { notFound } from "next/navigation";
import Link from "next/link";
import { getPromptAction } from "@/actions/promptHistory";
import PromptEditor from "@/components/PromptEditor";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PromptEditPage({ params }: Props) {
  const { id } = await params;
  const result = await getPromptAction(id);

  if (result.error || !result.prompt) notFound();

  const prompt = result.prompt;

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 flex flex-col gap-6">
      <div>
        <Link
          href={`/history/${id}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to History
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-2">
          Create New Version
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {prompt.title} · v{prompt.version}
        </p>
      </div>

      <PromptEditor prompt={prompt} />
    </main>
  );
}
