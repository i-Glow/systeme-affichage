import { Request, Response } from "express";
import prisma from "../db";

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).send({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export { getUsers };
