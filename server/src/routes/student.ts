import Router from "express";
import { checkStudant } from "../controllers/student";

const router = Router();
router.post("/checkStudent", checkStudant);

export default router;
