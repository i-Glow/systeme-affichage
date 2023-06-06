-- CreateEnum
CREATE TYPE "Role" AS ENUM ('responsable_affichage', 'super_user');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('approved', 'pending', 'rejected', 'deleted');

-- CreateTable
CREATE TABLE "article" (
    "article_id" TEXT NOT NULL,
    "titre" VARCHAR(100) NOT NULL,
    "contenu" VARCHAR(1000) NOT NULL,
    "niveau" VARCHAR(2)[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "edited_at" TIMESTAMP(3),
    "date_debut" TIMESTAMP(3) NOT NULL,
    "date_fin" TIMESTAMP(3) NOT NULL,
    "includeFb" BOOLEAN NOT NULL DEFAULT false,
    "fbPostId" TEXT,
    "creator_id" TEXT NOT NULL,
    "categorie_id" INTEGER NOT NULL,
    "state" "State" NOT NULL,
    "importance" BOOLEAN NOT NULL,

    CONSTRAINT "article_pkey" PRIMARY KEY ("article_id")
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
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "student" (
    "matricule" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("matricule")
);

-- CreateTable
CREATE TABLE "event" (
    "event_id" TEXT NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "bloc" (
    "bloc_id" TEXT NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "bloc_pkey" PRIMARY KEY ("bloc_id")
);

-- CreateIndex
CREATE INDEX "article_titre_contenu_idx" ON "article"("titre", "contenu");

-- CreateIndex
CREATE INDEX "article_created_at_idx" ON "article" USING BRIN ("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "categorie_nom_key" ON "categorie"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "categorie"("category_id") ON DELETE RESTRICT ON UPDATE CASCADE;
