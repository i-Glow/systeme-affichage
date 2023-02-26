import { Router } from "express";
import articles from "./articles";
import auth from "./auth";
import affichage from "./affichage";
import categorie from "./categorie";
const router: Router = Router();

router.use("/api/affichage", affichage);
router.use("/api/articles", articles);
router.use("/api/auth", auth);
router.use("/api/categorie", categorie);

export default router;
