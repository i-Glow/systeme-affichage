import type { Request } from "express";

export default interface CustomRequest extends Request {
  user?: {
    uid: string;
    role: string;
  };
}
