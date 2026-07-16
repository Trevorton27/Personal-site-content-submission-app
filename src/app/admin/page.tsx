import { redirect } from "next/navigation";
import { listAllPromptsAdminAction } from "@/actions/admin";
import AdminPromptTable from "@/components/AdminPromptTable";

export default async function AdminPage() {
  const result = await listAllPromptsAdminAction();
  if (result.error) redirect("/");

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Admin — All Prompts
      </h1>
      <AdminPromptTable prompts={result.prompts ?? []} />
    </main>
  );
}
