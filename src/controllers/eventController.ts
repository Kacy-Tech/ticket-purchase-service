import { Request, Response } from 'express';
import Event from '../models/Event';
import { AuthRequest } from '../middlewares/auth';

const createEvent = async (req: AuthRequest, res: Response) => {
  const { name, date, time, venue, tickets } = req.body;

  const event = new Event({
    name,
    date,
    time,
    venue,
    tickets,
    creator: req.user._id,
  });

  const createdEvent = await event.save();
  res.status(201).json(createdEvent);
};

const updateEvent = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, date, time, venue, tickets } = req.body;

  const event = await Event.findById(id);

  if (event && event.creator.toString() === req.user._id.toString()) {
    event.name = name || event.name;
    event.date = date || event.date;
    event.time = time || event.time;
    event.venue = venue || event.venue;
    event.tickets = tickets || event.tickets;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } else {
    res.status(404).json({ message: 'Event not found or user not authorized' });
  }
};

const getEvents = async (req: Request, res: Response) => {
  const events = await Event.find({});
  res.json(events);
};

const getEventById = async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

export { createEvent, updateEvent, getEvents, getEventById };
