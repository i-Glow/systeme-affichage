import { Role } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import type CustomRequest from "../types/CustomRquest";

const verifySuperUser = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== Role.super_user)
    return res.status(401).send({ message: "You cannot perform this action" });

  next();
};

export default verifySuperUser;
