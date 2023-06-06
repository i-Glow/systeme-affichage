import Router from "express";
import { getAffichage, getMobileAffichage } from "../controllers/affichage";

const router = Router();

router.get("/", getAffichage);

router.get("/mobile", getMobileAffichage);

export default router;
