import jwt from "jsonwebtoken";
import prisma from "../db";
import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

const createAccessToken = (payload: any) => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: process.env.ACCESS_DURATION,
    }
  );
  return accessToken;
};

const createFirstAdmin = async () => {
  try {
    const count = await prisma.user.count();

    if (count === 0) {
      const hashedPassword = await bcrypt.hash("admin", 12);

      await prisma.user.create({
        data: {
          nom: "admin",
          prenom: "admin",
          username: "admin",
          password: hashedPassword,
          role: Role.super_user,
        },
      });
    }
  } catch (error) {
    console.log(`[server] ${error}`);
  }
};

export { createAccessToken, createFirstAdmin };
