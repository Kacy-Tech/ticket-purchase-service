import express from "express";
import { protect } from "../middlewares/auth";
import {
  purchaseTicket,
  getPurchaseHistory,
} from "../controllers/ticketController";
import {
  validatePurchaseTicket,
  handleValidationErrors,
} from "../utils/validators";

const router = express.Router();

router.post(
  "/purchase",
  protect,
  validatePurchaseTicket,
  handleValidationErrors,
  purchaseTicket
);
router.get("/history", protect, getPurchaseHistory);

export default router;
