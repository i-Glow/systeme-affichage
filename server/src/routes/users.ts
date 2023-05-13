import Router from "express";
import {
  changeUserPassword,
  getUsers,
  suspendUser,
} from "../controllers/users";
import verifySuperUser from "../middlewares/verifySuperUser";
import verifyToken from "../middlewares/verifyToken";

const router = Router();

router.use(verifyToken);
router.use(verifySuperUser);

router.get("/", getUsers);
router.put("/:id/suspend", suspendUser);
router.put("/:id/changePassword", changeUserPassword);

export default router;
