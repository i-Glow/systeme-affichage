import { Router } from "express";
import articles from "./articles";
import auth from "./auth";
import affichage from "./affichage";
import categorie from "./categorie";
import users from "./users";
import map from "./map";
import student from "./student";
const router: Router = Router();

router.use("/api/affichage", affichage);
router.use("/api/articles", articles);
router.use("/api/auth", auth);
router.use("/api/categorie", categorie);
router.use("/api/users", users);
router.use("/api/map", map);
router.use("/api/student", student);

export default router;
