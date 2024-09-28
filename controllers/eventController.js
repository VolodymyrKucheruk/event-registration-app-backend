import { Event, eventSchemaValidation } from "../models/Event.js";
import HttpError from "../helpers/HttpError.js";

export const getEvents = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const events = await Event.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Event.countDocuments();

    res.status(200).json({
      events,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) return next(HttpError(404, "Event not found"));
    res.status(200).json(event);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const createEvent = async (req, res, next) => {
  const { error } = eventSchemaValidation.validate(req.body);
  if (error) return next(HttpError(400, error.details[0].message));

  try {
    const { title, description, eventDate, organizer } = req.body;
    const event = new Event({ title, description, eventDate, organizer });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const updateEvent = async (req, res, next) => {
  const { error } = eventSchemaValidation.validate(req.body);
  if (error) return next(HttpError(400, error.details[0].message));

  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    if (!event) return next(HttpError(404, "Event not found"));
    res.status(200).json(event);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    if (!event) return next(HttpError(404, "Event not found"));
    res.status(200).json({ message: "Event deleted" });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};
