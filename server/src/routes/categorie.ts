import Router from "express";
import { getAllCategories } from "../controllers/categorie";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getAllCategories);

export default router;
