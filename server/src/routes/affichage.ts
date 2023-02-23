import Router from "express";
import { getAffichage } from "../controllers/affichage";

const router = Router();

router.get("/", getAffichage);

export default router;
