-- CreateEnum
CREATE TYPE "Role" AS ENUM ('responsable_affichage', 'super_user');

-- CreateTable
CREATE TABLE "article" (
    "article_id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "niveau" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" TIMESTAMP(3),
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "brouillon" BOOLEAN NOT NULL DEFAULT false,
    "creator_id" TEXT NOT NULL,
    "categorie_id" INTEGER NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "version_article" (
    "version_article_id" TEXT NOT NULL,
    "article_id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "niveau" VARCHAR(2)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "brouillon" BOOLEAN NOT NULL DEFAULT false,
    "creator_id" TEXT NOT NULL,
    "categorie_id" INTEGER NOT NULL,

    CONSTRAINT "version_article_pkey" PRIMARY KEY ("version_article_id")
);

-- CreateTable
CREATE TABLE "categorie" (
    "category_id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "categorie_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "categorie"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "version_article" ADD CONSTRAINT "version_article_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "version_article" ADD CONSTRAINT "version_article_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "categorie"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
