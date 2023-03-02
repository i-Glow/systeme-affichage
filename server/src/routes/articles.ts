import Router from "express";
import {
  AproveArticle,
  createArticle,
  deleteArticle,
  editArticle,
  getAll,
  getArchive,
  getArticle,
  getArticlesByUserRole,
} from "../controllers/articles";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getAll);
router.get("/archive", getArchive);
router.get("/pending", getArticlesByUserRole);

router.get("/:id", getArticle);

router.post("/", createArticle);

router.put("/aprove/:id", AproveArticle);

router.put("/:id", editArticle);

router.delete("/:id", deleteArticle);

export default router;
