import type { Request, Response, NextFunction } from "express";
import type CustomRequest from "../types/CustomRquest";
import jwt, { Secret } from "jsonwebtoken";

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(403).send({ message: "No token provided" });

  let token = bearer.split(" ")[1];
  const key = process.env.JWT_ACCESS_SECRET as Secret;

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      return res.status(403).send(err);
    } else {
      //@ts-ignore
      if (decoded) req.user = { uid: decoded.uid, role: decoded.role };

      next();
    }
  });
};

export default verifyToken;
