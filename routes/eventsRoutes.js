import express from "express";
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import validateBody from "../helpers/validateBody.js";
import isValidId from "../helpers/isValidId.js";
import { eventSchemaValidation } from "../models/Event.js";

const router = express.Router();

router
  .route("/")
  .get(getEvents)
  .post(validateBody(eventSchemaValidation), createEvent);

router
  .route("/:id")
  .get(isValidId("id"), getEventById)
  .put(isValidId("id"), validateBody(eventSchemaValidation), updateEvent)
  .delete(isValidId("id"), deleteEvent);

export default router;
