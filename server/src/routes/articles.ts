import Router from "express";
import {
  createArticle,
  deleteArticle,
  editArticle,
  getAll,
  getArchive,
  getArticle,
  getArticlesByUserRole,
  editArticleState,
  getPendingArticlesCount,
} from "../controllers/articles";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getAll);

router.get("/archive", getArchive);

router.get("/pending", getArticlesByUserRole);

router.get("/pending/count", getPendingArticlesCount);

router.get("/:id", getArticle);

router.post("/", createArticle);

router.put("/state/:id", editArticleState);

router.put("/:id", editArticle);

router.delete("/:id", deleteArticle);

export default router;
