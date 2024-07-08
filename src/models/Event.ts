import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  name: string;
  date: Date;
  time: string;
  venue: string;
  tickets: {
    category: string;
    price: number;
    availability: number;
  }[];
  creator: Schema.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  tickets: [
    {
      category: String,
      price: Number,
      availability: Number,
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Event = model<IEvent>('Event', eventSchema);
export default Event;
