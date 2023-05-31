import prisma from "../db";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

const checkStudant = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const student = await prisma.student.findUnique({
      where: {
        matricule: password,
      },
    });
    if (!student) {
      // Invalid username or password
      return res.status(401).send({ message: "Invalid username or password" });
    }

    /* const validPassword = await bcrypt.compare(password, student.matricule);

    if (!validPassword) {
      // Wrong password
      return res.status(403).send({ message: "Wrong password" });
    } */
    if (student.nom !== username) {
      return res.status(403).send({ message: "Wrong username" });
    }
    // Authentication successful
    return res
      .status(200)
      .send({ message: "Authentication successful", data: student });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "An error occurred" });
  }
};

export { checkStudant };
