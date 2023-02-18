import { article } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";

const getAll = async (_: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      select: {
        article_id: true,
        titre: true,
        created_at: true,
        categorie: true,
      },
      orderBy: {
        date_debut: "asc",
      },
      where: {
        date_fin: {
          gt: new Date().toISOString(),
        },
      },
    });

    res.status(200).send({ data: articles });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const getArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: {
        article_id: id,
      },
    });

    res.status(200).send({ data: article });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const createArticle = async (req: Request, res: Response) => {
  try {
    const { titre, contenu, date_debut, date_fin, niveau, category_id } =
      req.body;

    console.log(date_debut, date_fin);

    const newArticle: article = await prisma.article.create({
      data: {
        titre,
        contenu,
        date_debut,
        date_fin,
        creator: {
          connect: {
            user_id: "cle8qfieu0000uiv01sa4my66",
          },
        },
        categorie: {
          //FIXME: make categories dynamic
          connectOrCreate: {
            create: {
              nom: "text",
            },
            where: {
              category_id: 1,
            },
          },
        },
        niveau,
        brouillon: false,
      },
    });

    res.status(200).send({ data: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const deleteArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.article.delete({
      where: {
        article_id: id,
      },
    });

    res.sendStatus(204);
  } catch (error: any) {
    console.error(error.code);
    if (error.code === "P2025") {
      return res.status(404).send({ message: "article n'existe pas" });
    }
    res.status(500).send({ message: "Server error" });
  }
};

export { getAll, getArticle, createArticle, deleteArticle };
