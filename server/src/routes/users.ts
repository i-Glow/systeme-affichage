import Router from "express";
import { getUsers } from "../controllers/users";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getUsers);

export default router;
