import { Request, Response } from "express";
import prisma from "../db";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        _count: {
          select: {
            article: true,
          },
        },
        nom: true,
        prenom: true,
        role: true,
        user_id: true,
        username: true,
        suspended: true,
      },
    });

    res.status(200).send({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const suspendUser = async (req: Request, res: Response) => {
  try {
    const { suspend } = req.body;

    const { id } = req.params;

    await prisma.user.update({
      data: {
        suspended: suspend,
      },
      where: {
        user_id: id,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

export { getUsers, suspendUser };
