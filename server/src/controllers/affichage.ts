import prisma from "../db";
import { Request, Response } from "express";

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
      },
    });

    res.status(200).send({ data: affichage });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export { getAffichage };
