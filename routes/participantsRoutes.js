import express from "express";
import {
  getParticipants,
  registerParticipant,
  updateParticipant,
  deleteParticipant,
} from "../controllers/participantsController.js";
import isValidId from "../helpers/isValidId.js";
import validateBody from "../helpers/validateBody.js";
import {
  participantRegistrationSchema,
  participantUpdateSchema,
} from "../models/Participant.js";

const router = express.Router();

router
  .route("/:eventId")
  .get(isValidId("eventId"), getParticipants);

router
  .route("/register")
  .post(validateBody(participantRegistrationSchema), registerParticipant);

router
  .route("/:id")
  .put(
    isValidId("id"),
    validateBody(participantUpdateSchema),
    updateParticipant
  )
  .delete(isValidId("id"), deleteParticipant);

export default router;
