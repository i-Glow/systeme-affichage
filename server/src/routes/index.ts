import { Router } from "express";
import articles from "./articles";
import auth from "./auth";
const router: Router = Router();

router.use("/api/articles", articles);
router.use("/api/auth", auth);

export default router;
