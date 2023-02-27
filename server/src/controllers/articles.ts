import { article, categorie } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";

const getAll = async (_: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      select: {
        article_id: true,
        titre: true,
        created_at: true,
        niveau: true,
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
      select: {
        article_id: true,
        titre: true,
        niveau: true,
        contenu: true,
        date_debut: true,
        date_fin: true,
        categorie: true,
        created_at: true,
        edited_at: true,
        creator: {
          select: {
            nom: true,
            prenom: true,
          },
        },
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
    const { titre, contenu, date_debut, date_fin, niveau, categoryName } =
      req.body;

    const newArticle: article = await prisma.article.create({
      data: {
        titre,
        contenu,
        date_debut,
        date_fin,
        creator: {
          connect: {
            //@ts-ignore
            user_id: req.user,
          },
        },
        categorie: {
          connectOrCreate: {
            create: {
              nom: categoryName,
            },
            where: {
              nom: categoryName,
            },
          },
        },
        niveau,
      },
      include: {
        categorie: true,
      },
    });

    res.status(200).send({ data: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const editArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { titre, contenu, date_debut, date_fin, niveau, categoryName } =
      req.body;

    await prisma.article.update({
      data: {
        titre,
        contenu,
        date_debut,
        date_fin,
        edited_at: new Date().toISOString(),
        niveau,
        categorie: {
          connectOrCreate: {
            create: {
              nom: categoryName,
            },
            where: {
              nom: categoryName,
            },
          },
        },
      },
      where: {
        article_id: id,
      },
    });

    res.sendStatus(204);
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

export { getAll, getArticle, createArticle, deleteArticle, editArticle };
