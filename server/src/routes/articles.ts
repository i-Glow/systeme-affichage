import Router from "express";
import {
  createArticle,
  deleteArticle,
  editArticle,
  getAll,
  getArticle,
} from "../controllers/articles";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getAll);

router.get("/:id", getArticle);

router.post("/", createArticle);

router.put("/:id", editArticle);

router.delete("/:id", deleteArticle);

export default router;
