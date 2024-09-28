import Participant from "../models/Participant.js";
import HttpError from "../helpers/HttpError.js";

export const getParticipants = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const participants = await Participant.find({ event: eventId });
    res.status(200).json(participants);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const registerParticipant = async (req, res, next) => {
  try {
    const { fullName, email, dateOfBirth, heardFrom, event } = req.body;
    const participant = new Participant({
      fullName,
      email,
      dateOfBirth,
      heardFrom,
      event,
    });
    await participant.save();
    res.status(201).json(participant);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const updateParticipant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!participant) {
      return next(HttpError(404, "Participant not found"));
    }
    res.status(200).json(participant);
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const deleteParticipant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const participant = await Participant.findByIdAndDelete(id);
    if (!participant) {
      return next(HttpError(404, "Participant not found"));
    }
    res.status(200).json({ message: "Participant deleted" });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};
