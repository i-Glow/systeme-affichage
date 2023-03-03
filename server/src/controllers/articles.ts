import { article, categorie, Role, State, Prisma } from "@prisma/client";
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
        state: State.aproved,
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

const getArchive = async (req: Request, res: Response) => {
  try {
    // Check if user is an admin
    //@ts-ignore
    // if (req.user.role !== Role.super_user) {
    //   return res
    //     .status(401)
    //     .send({ message: "You are not authorized to perform this action" });
    // }

    // Get pagination parameters from query string
    const { page = 1, pageSize = 10, search = "" } = req.query;
    const skip: number = (Number(page) - 1) * Number(pageSize);

    const searchQuery: Prisma.articleWhereInput = {
      OR: [
        { titre: { contains: search as string, mode: "insensitive" } },
        { contenu: { contains: search as string, mode: "insensitive" } },
        { state: State.rejected },
      ],
    };

    // Fetch articles using pagination
    const articles = await prisma.article.findMany({
      skip,
      take: Number(pageSize),
      orderBy: {
        created_at: "desc",
      },
      where: searchQuery,
      include: {
        creator: {
          select: {
            password: false,
            username: true,
            article: true,
            nom: true,
            prenom: true,
            role: true,
            suspended: true,
            user_id: true,
          },
        },
      },
    });

    const totalCount = await prisma.article.count({
      where: searchQuery,
    });

    res.status(200).send({
      data: articles,
      count: totalCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching articles" });
  }
};

const createArticle = async (req: Request, res: Response) => {
  try {
    const { titre, contenu, date_debut, date_fin, niveau, categoryName } =
      req.body;
    //@ts-ignore
    const { role, uid } = req.user;
    let newArticle: article;
    if (role === Role.super_user) {
      newArticle = await prisma.article.create({
        data: {
          titre,
          contenu,
          date_debut,
          date_fin,
          creator: {
            connect: {
              //@ts-ignore
              user_id: uid,
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
          state: State.aproved,
        },
        include: {
          categorie: true,
        },
      });
    } else {
      newArticle = await prisma.article.create({
        data: {
          titre,
          contenu,
          date_debut,
          date_fin,
          creator: {
            connect: {
              //@ts-ignore
              user_id: uid,
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
          state: State.pending,
        },
        include: {
          categorie: true,
        },
      });
    }
    res.status(200).send({ data: newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const editArticle = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.params;
    const { titre, contenu, date_debut, date_fin, niveau, categoryName } =
      req.body;
    if (role === Role.super_user) {
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
    } else {
      await prisma.article.update({
        data: {
          titre,
          contenu,
          date_debut,
          date_fin,
          edited_at: new Date().toISOString(),
          niveau,
          state: State.pending,
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
    }
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

const AproveArticle = async (req: Request, res: Response) => {
  try {
    let articles;
    const { id } = req.params;
    articles = await prisma.article.update({
      data: {
        state: State.aproved,
      },
      where: {
        article_id: id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const getArticlesByUserRole = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { role, uid } = req.user; // Assuming the user object contains the user's role

    let articles;
    if (role === Role.super_user) {
      // If user is an admin, fetch all articles
      articles = await prisma.article.findMany({
        where: {
          state: State.pending,
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
    } else {
      // If user is not an admin, fetch only published articles
      articles = await prisma.article.findMany({
        where: {
          creator_id: uid,
          state: State.pending,
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
    }
    res.status(200).send({ data: articles });
  } catch (error) {
    console.log("first");
    res.status(500).json({ error: "Error fetching articles" });
  }
};

const editArticleState = async (req: Request, res: Response) => {
  try {
    let articles;
    const { id } = req.params;
    articles = await prisma.article.update({
      data: {
        state: State.rejected,
      },
      where: {
        article_id: id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export {
  getAll,
  getArticle,
  createArticle,
  deleteArticle,
  editArticle,
  AproveArticle,
  getArticlesByUserRole,
  getArchive,
  editArticleState,
};
