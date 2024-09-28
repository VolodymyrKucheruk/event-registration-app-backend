// models/Event.js
import mongoose from "mongoose";
import Joi from "joi";

export const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000,
    },
    eventDate: {
      type: Date, // Зміна типу на Date
      required: true,
    },
    organizer: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
  },
  {
    versionKey: false,
  }
);

export const eventSchemaValidation = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  eventDate: Joi.date().required(), // Зміна на Joi.date()
  organizer: Joi.string().min(3).max(100).required(),
});

export const Event = mongoose.model("Event", eventSchema);
