import Router from "express";
import { creatUser, signin } from "../controllers/auth";

const router = Router();

router.post("/signin", signin);
router.post("/create-user", creatUser);

export default router;
