-- CreateTable
CREATE TABLE "Prompt" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "formData" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "rootPromptId" TEXT,
    "parentPromptId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Prompt_clerkUserId_createdAt_idx" ON "Prompt"("clerkUserId", "createdAt");

-- CreateIndex
CREATE INDEX "Prompt_rootPromptId_version_idx" ON "Prompt"("rootPromptId", "version");

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_rootPromptId_fkey" FOREIGN KEY ("rootPromptId") REFERENCES "Prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_parentPromptId_fkey" FOREIGN KEY ("parentPromptId") REFERENCES "Prompt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
