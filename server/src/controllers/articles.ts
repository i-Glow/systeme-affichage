import { article, Role, State, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import pendingCountEventEmmiter from "../utils/EventEmmiter";
import axios from "axios";
import type CustomRequest from "../types/CustomRquest";

const getAll = async (req: CustomRequest, res: Response) => {
  try {
    const whereClause: Prisma.articleWhereInput =
      req.user?.role === Role.super_user
        ? {
            date_fin: {
              gt: new Date().toISOString(),
            },
            state: State.approved,
          }
        : {
            date_fin: {
              gt: new Date().toISOString(),
            },
            state: State.approved,
            creator_id: req.user?.uid,
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
    });

    res.status(200).send({ data: articles });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const getArticle = async (req: CustomRequest, res: Response) => {
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
        fbPostId: true,
        importance: true,
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
      throw new Error("NOT_FOUND");
    }

    if (
      article.creator.user_id !== req.user?.uid &&
      req.user?.role !== Role.super_user
    ) {
      throw new Error("NOT_AUTHORIZED");
    }

    res.status(200).send({ data: article });
  } catch (error: any) {
    console.error(error);

    switch (error.message) {
      case "NOT_FOUND":
        res.status(404).send({ message: "Article does not exist" });
        break;
      case "NOT_AUTHORIZED":
        res
          .status(401)
          .send({ message: "You are not authorized to perform this action" });
        break;
      default:
        res.status(500).send({ message: "Server error" });
    }
  }
};

const getArchive = async (req: CustomRequest, res: Response) => {
  try {
    // Check if user is an admin

    if (req.user?.role !== Role.super_user) {
      throw new Error("NOT_AUTHORIZED");
    }

    // Get pagination parameters from query string
    const {
      page = 1,
      pageSize = 10,
      search = "",
      nom = "",
      prenom = "",
      levels,
    } = req.query;

    const skip: number = (Number(page) - 1) * Number(pageSize);
    let level: string[] = [];
    let searchQuery: Prisma.articleWhereInput;

    //skipping typescript error
    if (typeof levels === "string") {
      level = levels?.split(",").filter((lvl) => lvl !== "");
    }

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
          {
            niveau: level.length
              ? { hasSome: level as string[] }
              : { isEmpty: false },
          },
        ],
      };
    } else {
      searchQuery = {
        AND: [
          {
            OR: [
              { titre: { contains: search as string, mode: "insensitive" } },
              { contenu: { contains: search as string, mode: "insensitive" } },
            ],
          },
          {
            niveau: level.length
              ? { hasSome: level as string[] }
              : { isEmpty: false },
          },
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
  } catch (error: any) {
    console.error(error);
    if (error.message === "NOT_AUTHORIZED")
      return res
        .status(401)
        .send({ message: "You are not authorized to perform this action" });

    res.status(500).send({ message: "Error fetching articles" });
  }
};

const postToFacebook = async (
  content: string,
  scheduledTime: string | Date
): Promise<string | Error> => {
  const message = (content as string).replaceAll(
    /\[url:(?<url>(https?:\/\/)?[\w-]+\.[\w-]+\S*)\]|\[qr:(?<qr>.*?)\]/g,
    "$<url>$<qr>"
  );

  const MIN_SCHEDULE_TIME = 10 * 60; // 10 minutes in seconds
  const MAX_SCHEDULE_TIME = 75 * 24 * 60 * 60; // 75 days in seconds

  const scheduledTimeInSeconds = Math.floor(
    (new Date(scheduledTime) as any) / 1000
  );
  const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

  const timeDiff = scheduledTimeInSeconds - currentTime;

  const body: any = {
    message: message,
    access_token: process.env.FB_PAGE_ACCESS_TOKEN,
  };

  if (timeDiff > MIN_SCHEDULE_TIME && timeDiff < MAX_SCHEDULE_TIME) {
    body.published = false;
    body.scheduled_publish_time = scheduledTimeInSeconds;
  }

  const url = `https://graph.facebook.com/${process.env.FB_PAGE_ID}/feed`;
  try {
    const response: any = await axios({
      url,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
    });

    return response.data.id;
  } catch (error: any) {
    console.error(error);
    return new Error(error);
  }
};

const createArticle = async (req: Request, res: Response) => {
  try {
    const {
      titre,
      contenu,
      date_debut,
      date_fin,
      niveau,
      categoryName,
      includeFb,
      importance,
    } = req.body;
    //@ts-ignore
    const { role, uid } = req.user;
    let newArticle: article;
    let fbPostId;

    // if the user is an admin post to facebook
    if (role === Role.super_user) {
      fbPostId = null;
      if (includeFb) {
        fbPostId = await postToFacebook(contenu, date_debut);

        if (typeof fbPostId !== "string") {
          return res.status(400).send({ message: fbPostId.message });
        }
      }
    }

    // insert article
    newArticle = await prisma.article.create({
      data: {
        titre,
        contenu,
        date_debut,
        date_fin,
        includeFb,
        fbPostId,
        importance,
        creator: {
          connect: {
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
        // if the user is an admin approve the article else set it as pending
        state: role === Role.super_user ? State.approved : State.pending,
      },
      include: {
        categorie: true,
      },
    });

    // if the user is not a (responsable d'affichage) notify all admins
    if (role === Role.responsable_affichage) {
      pendingCountEventEmmiter.emit("newArticle", {
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
    // @ts-ignore
    const { role } = req.user;
    const { id } = req.params;
    const {
      titre,
      contenu,
      date_debut,
      date_fin,
      niveau,
      categoryName,
      importance,
    } = req.body;

    if (role === Role.super_user) {
      await prisma.article.update({
        data: {
          titre,
          contenu,
          date_debut,
          date_fin,
          edited_at: new Date().toISOString(),
          niveau,
          importance,
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
      const article = await prisma.article.update({
        data: {
          titre,
          contenu,
          date_debut,
          date_fin,
          edited_at: new Date().toISOString(),
          niveau,
          importance,
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

      pendingCountEventEmmiter.emit("newArticle", {
        article,
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

const getArticlesByUserRole = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const { role, uid } = req.user;

    let articles;
    let where;

    if (role === Role.super_user) {
      // If user is an admin, fetch all articles
      where = { state: State.pending };
    } else {
      // else fetch only published articles by him
      where = {
        creator_id: uid,
        state: State.pending,
      };
    }

    articles = await prisma.article.findMany({
      where: where,
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
    pendingCountEventEmmiter.removeAllListeners("newArticle");

    // @ts-ignore
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

    pendingCountEventEmmiter.on("newArticle", ({ article }) => {
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
    const { state }: { state: State } = req.body;

    const data: any = {
      state,
    };

    if (state === State.approved) {
      const article = await prisma.article.findUnique({
        select: {
          contenu: true,
          date_debut: true,
          includeFb: true,
        },
        where: {
          article_id: id,
        },
      });

      if (!article)
        return res.status(404).send({ message: "Article not found" });

      if (article.includeFb) {
        let fbPostId = await postToFacebook(
          article.contenu,
          article.date_debut
        );

        if (typeof fbPostId !== "string") {
          return res.status(400).send({ message: fbPostId.message });
        }

        data.fbPostId = fbPostId;
      }
    }

    await prisma.article.update({
      data,
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
  getArticlesByUserRole,
  getPendingArticlesCount,
  getArchive,
  editArticleState,
};
