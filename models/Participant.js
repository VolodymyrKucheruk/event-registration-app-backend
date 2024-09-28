// models/Participant.js
import mongoose from "mongoose";
import Joi from "joi";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const participantSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    dateOfBirth: {
      type: Date, // Зміна типу на Date
      required: true,
    },
    heardFrom: {
      type: String,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const participantRegistrationSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).required(),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.pattern.base": "Email must be a valid email address",
  }),
  dateOfBirth: Joi.date().required(), // Зміна на Joi.date()
  heardFrom: Joi.string().required(),
  event: Joi.string().required(),
});

export const participantUpdateSchema = Joi.object({
  fullName: Joi.string().min(3).max(100).optional(),
  email: Joi.string().pattern(emailRegexp).optional().messages({
    "string.pattern.base": "Email must be a valid email address",
  }),
  dateOfBirth: Joi.date().optional(), // Зміна на Joi.date()
  heardFrom: Joi.string().optional(),
  event: Joi.string().optional(),
});

const Participant = mongoose.model("Participant", participantSchema);

export default Participant;
