-- AlterTable
ALTER TABLE "article" ADD COLUMN     "fbPostId" TEXT,
ADD COLUMN     "includeFb" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "article_titre_contenu_idx" ON "article"("titre", "contenu");

-- CreateIndex
CREATE INDEX "article_created_at_idx" ON "article" USING BRIN ("created_at");
