import { Request, Response } from "express";
import prisma from "../db";
import CustomRequest from "../types/CustomRquest";
import bcrypt, { hash } from "bcrypt";

const getUsers = async (req: CustomRequest, res: Response) => {
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

const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;

    const { id } = req.params;

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        user_id: id,
      },
    });

    res.status(200).send({ message: "password succesfuly updated" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Couldn't change password" });
  }
};

export { getUsers, suspendUser, changeUserPassword };
