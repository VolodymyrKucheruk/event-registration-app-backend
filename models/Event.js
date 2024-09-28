import mongoose from "mongoose";
import Joi from "joi";

const dateTimeRegexp = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

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
      type: String,
      required: true,
      match: dateTimeRegexp,
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
  eventDate: Joi.string().pattern(dateTimeRegexp).required().messages({
    "string.pattern.base": "Event date must be in the format YYYY-MM-DD HH:mm",
  }),
  organizer: Joi.string().min(3).max(100).required(),
});

export const Event = mongoose.model("Event", eventSchema);

