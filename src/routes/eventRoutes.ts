import express from "express";
import { protect } from "../middlewares/auth";
import {
  createEvent,
  updateEvent,
  getEvents,
  getEventById,
} from "../controllers/eventController";
import {
  validateEventCreation,
  validateObjectId,
  handleValidationErrors,
} from "../utils/validators";

const router = express.Router();

router
  .route("/")
  .post(protect, validateEventCreation, handleValidationErrors, createEvent)
  .get(getEvents);

router
  .route("/:id")
  .get(validateObjectId, handleValidationErrors, getEventById)
  .put(
    protect,
    validateObjectId,
    handleValidationErrors,
    validateEventCreation,
    handleValidationErrors,
    updateEvent
  );

export default router;
