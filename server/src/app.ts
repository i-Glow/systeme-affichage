import express, { Express } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import router from "./routes";
import morgan from "morgan";
import bcrypt from "bcrypt";
import prisma from "./db";
import { Role } from "@prisma/client";

//initialisation
dotenv.config();
const app: Express = express();
// app.use(morgan("dev"));

//constants
const PORT = process.env.PORT || 8080;
const CORS_OPTIONS = {
  origin: process.env.ALLOWED_ORIGINS,
  credentials: true,
  optionsSuccessStatus: 204,
};

//midllewares
app.use(cors(CORS_OPTIONS));
app.use(express.json({ limit: "5mb" }));
// app.use(cookieParser());
app.use(router);

//starting server
app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);

  //   if (process.env.NODE_ENV !== "development") {
  //     const hashedPassword = await bcrypt.hash("admin", 12);

  //     await prisma.user.create({
  //       data: {
  //         nom: "admin",
  //         prenom: "admin",
  //         username: "admin",
  //         password: hashedPassword,
  //         role: Role.super_user,
  //       },
  //     });
  //   }
});
