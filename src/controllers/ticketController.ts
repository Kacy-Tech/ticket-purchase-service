import { Request, Response } from "express";
import Event from "../models/Event";
import Ticket from "../models/Ticket";
import { AuthRequest } from "../middlewares/auth";

const purchaseTicket = async (req: AuthRequest, res: Response) => {
  const { eventId, category, quantity } = req.body;

  const event = await Event.findById(eventId);

  if (event) {
    const ticketCategory = event.tickets.find((t) => t.category === category);

    if (ticketCategory && ticketCategory.availability >= quantity) {
      ticketCategory.availability -= quantity;

      const ticket = new Ticket({
        event: eventId,
        user: req.user._id,
        category,
        quantity,
      });

      await ticket.save();
      await event.save();

      res.status(201).json(ticket);
    } else {
      res.status(400).json({ message: "Insufficient tickets available" });
    }
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

const getPurchaseHistory = async (req: AuthRequest, res: Response) => {
  const tickets = await Ticket.find({ user: req.user._id }).populate(
    "event",
    "name date time venue"
  );

  res.json(tickets);
};

export { purchaseTicket, getPurchaseHistory };
