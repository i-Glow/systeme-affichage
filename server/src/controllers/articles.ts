import { article, Role, State, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import pendingCountEventEmmiter from "../utils/EventEmmiter";

const getAll = async (req: Request, res: Response) => {
  try {
    const whereClause: Prisma.articleWhereInput =
      //@ts-ignore
      req.user.role === Role.super_user
        ? {
            date_fin: {
              gt: new Date().toISOString(),
            },
            state: State.aproved,
          }
        : {
            date_fin: {
              gt: new Date().toISOString(),
            },
            state: State.aproved,
            //@ts-ignore
            creator_id: req.user.uid,
          };

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
      where: whereClause,
      // date_fin: {
      //   gt: new Date().toISOString(),
      // },
      // state: State.aproved,
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
        state: true,
        creator: {
          select: {
            user_id: true,
            nom: true,
            prenom: true,
          },
        },
      },
    });

    if (!article) {
      return res.status(404).send({ message: "Article does not exist" });
    }

    if (
      //@ts-ignore
      article.creator.user_id !== req.user.uid &&
      //@ts-ignore
      req.user.role !== Role.super_user
    ) {
      return res.status(401).send({ message: "Not authorized" });
    }

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
    if (req.user.role !== Role.super_user) {
      return res
        .status(401)
        .send({ message: "You are not authorized to perform this action" });
    }

    // Get pagination parameters from query string
    const {
      page = 1,
      pageSize = 10,
      search = "",
      nom = "",
      prenom = "",
    } = req.query;
    const skip: number = (Number(page) - 1) * Number(pageSize);

    let searchQuery: Prisma.articleWhereInput;
    if (nom.length && prenom.length) {
      searchQuery = {
        AND: [
          {
            OR: [
              { titre: { contains: search as string, mode: "insensitive" } },
              { contenu: { contains: search as string, mode: "insensitive" } },
            ],
          },
          {
            AND: [
              { creator: { nom: { equals: nom as string } } },
              { creator: { prenom: { equals: prenom as string } } },
            ],
          },
        ],
      };
    } else {
      searchQuery = {
        OR: [
          { titre: { contains: search as string, mode: "insensitive" } },
          { contenu: { contains: search as string, mode: "insensitive" } },
        ],
      };
    }

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
            article: false,
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

      pendingCountEventEmmiter.emit("articleCreated", {
        article: newArticle,
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

const approveArticle = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.article.update({
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
    res.status(500).send({ message: "Error updating article state" });
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
    console.error(error);
    res.status(500).send({ error: "Error fetching articles" });
  }
};

interface client {
  id: number;
  response: Response;
}

let clients: client[] = [];

const getPendingArticlesCount = async (req: Request, res: Response) => {
  try {
    //remove all listeners to avoid duplicates
    pendingCountEventEmmiter.removeAllListeners("articleCreated");
    //@ts-ignore
    const { role } = req.user;

    if (role !== Role.super_user)
      return res
        .status(401)
        .send({ message: "You are not authorized to perform this action" });

    const count = await prisma.article.count({
      where: {
        state: State.pending,
      },
    });

    const headers = {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
    };
    res.writeHead(200, headers);

    const data = `data: ${JSON.stringify({ count })}\n\n`;

    //keep track of all opened conections
    const clientId = Date.now();
    clients.push({ id: Date.now(), response: res });

    res.write(data);

    pendingCountEventEmmiter.on("articleCreated", ({ article }) => {
      clients.forEach((client) =>
        client.response.write(`data: ${JSON.stringify({ article })}\n\n`)
      );
    });

    //remove closed connections
    req.on("close", () => {
      clients = clients.filter((client) => client.id !== clientId);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error fetching articles count" });
  }
};
const editArticleState = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.article.update({
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
    res.status(500).send({ message: "Error updating article" });
  }
};

export {
  getAll,
  getArticle,
  createArticle,
  deleteArticle,
  editArticle,
  approveArticle,
  getArticlesByUserRole,
  getPendingArticlesCount,
  getArchive,
  editArticleState,
};
