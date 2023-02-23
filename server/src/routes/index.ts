import { Router } from "express";
import articles from "./articles";
import auth from "./auth";
import affichage from "./affichage";
const router: Router = Router();

router.use("/api/affichage", affichage);
router.use("/api/articles", articles);
router.use("/api/auth", auth);

export default router;
