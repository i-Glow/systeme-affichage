import Router from "express";
import { getUsers, suspendUser } from "../controllers/users";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);

router.get("/", getUsers);
router.put("/:id/suspend", suspendUser);

export default router;
