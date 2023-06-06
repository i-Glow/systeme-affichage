import Router from "express";
import { creatUser, refreshToken, signin } from "../controllers/auth";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.post("/signin", signin);
router.post("/create-user", creatUser);

router.use(verifyToken);
router.get("/refresh", refreshToken);

export default router;
