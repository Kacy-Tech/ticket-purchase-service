import { Schema, model, Document } from 'mongoose';

interface ITicket extends Document {
  event: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  category: string;
  quantity: number;
}

const ticketSchema = new Schema<ITicket>({
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Ticket = model<ITicket>('Ticket', ticketSchema);
export default Ticket;
