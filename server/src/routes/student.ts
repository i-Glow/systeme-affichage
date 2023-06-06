import Router from "express";
import {
  checkStudant,
  createStudent,
  getStudents,
} from "../controllers/student";

const router = Router();
router.post("/checkStudent", checkStudant);
router.post("/", createStudent);
router.get("/", getStudents);

export default router;
