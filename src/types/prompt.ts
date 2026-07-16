export interface PromptRecord {
  id: string;
  clerkUserId: string;
  title: string;
  content: string;
  formData: Record<string, unknown> | null;
  version: number;
  rootPromptId: string | null;
  parentPromptId: string | null;
  createdAt: string;
  updatedAt: string;
}
