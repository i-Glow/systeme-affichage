import { Role, user } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../db";
import bcrypt from "bcrypt";
import { createAccessToken } from "../utils/auth";
import jwt, { Secret } from "jsonwebtoken";

const signin = async (req: Request, res: Response) => {
  try {
    const { username, password }: user = req.body;
    const user: user | null = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) return res.status(403).send({ message: "user not found" });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword)
      return res.status(403).send({ message: "wrong password" });

    const payload = { uid: user.user_id };

    const accessToken = createAccessToken(payload);

    res.status(200).send({
      token: accessToken,
      user: {
        user_id: user.user_id,
        username: user.username,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

const creatUser = async (req: Request, res: Response) => {
  try {
    const { nom, prenom, username, password } = req.body;
    const alreadyExists = await prisma.user.findUnique({ where: { username } });

    if (alreadyExists)
      return res.status(400).send({ message: "username already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        nom,
        prenom,
        username,
        password: hashedPassword,
        role: Role.responsable_affichage,
      },
    });

    res.sendStatus(204);
  } catch (error) {
    console.error(`[server] ${error}`);
    res.status(500).send({ message: "Server error" });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userid = req.user;

    const payload = { uid: userid };
    const accessToken = createAccessToken(payload);

    //@ts-ignore
    const user: user = await prisma.user.findUnique({
      where: {
        user_id: userid,
      },
    });

    res.status(200).send({
      token: accessToken,
      user: {
        user_id: user.user_id,
        username: user.username,
        nom: user.nom,
        prenom: user.prenom,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export { signin, creatUser, refreshToken };
