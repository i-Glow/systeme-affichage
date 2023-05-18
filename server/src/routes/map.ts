import Router from "express";
import {
  addBloc,
  addEvent,
  deleteEvent,
  getBlocs,
  getEvents,
} from "../controllers/map";

const router = Router();

router.post("/event", addEvent);
router.get("/event", getEvents);
router.delete("/event/:id", deleteEvent);
router.post("/bloc", addBloc);
router.get("/bloc", getBlocs);

export default router;
