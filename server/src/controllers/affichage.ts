import prisma from "../db";
import type { Request, Response } from "express";
import { State } from "@prisma/client";

const getAffichage = async (req: Request, res: Response) => {
  try {
    const affichage = await prisma.article.findMany({
      select: {
        titre: true,
        contenu: true,
        niveau: true,
      },
      where: {
        AND: {
          date_debut: {
            lt: new Date().toISOString(),
          },
          date_fin: {
            gt: new Date().toISOString(),
          },
        },
        state: State.approved,
      },
    });

    const DURR_PER_CHAR = 100;
    const DURR_QR = 20000;
    const DURR_LOST_TIME = 6000;
    const qrRegex = /\[qr:(.*?)\]/g;

    const result = affichage?.map((affichage) => {
      let time = DURR_LOST_TIME;

      time += affichage.contenu.match(qrRegex) ? DURR_QR : 0;
      time +=
        (affichage.contenu.length +
          affichage.titre.length +
          affichage.titre.length) *
        DURR_PER_CHAR;

      return { ...affichage, duration: time };
    });

    res.status(200).send({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const getMobileAffichage = async (req: Request, res: Response) => {
  try {
    const { level }: any = req.query;

    const articles = await prisma.article.findMany({
      select: {
        article_id: true,
        titre: true,
        contenu: true,
        created_at: true,
      },
      where: {
        niveau: level.length ? { hasSome: level } : { isEmpty: false },
      },
    });

    res.status(200).send(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error getting affichage" });
  }
};

export { getAffichage, getMobileAffichage };
