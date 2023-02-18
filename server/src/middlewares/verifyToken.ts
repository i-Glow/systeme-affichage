import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) return res.status(403).send({ message: "No token provided" });

  let token = bearer.split(" ")[1];
  const key = process.env.JWT_ACCESS_SECRET as Secret;

  jwt.verify(token, key, (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Server error" });
    } else {
      //@ts-ignore
      if (decoded) req.user = decoded.uid;
      next();
    }
  });
};

export default verifyToken;
