import { Request, Response } from "express";
import prisma from "../db";

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.categorie.findMany({
      orderBy: {
        nom: "asc",
      },
    });

    res.status(200).send({ data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

export { getAllCategories };
