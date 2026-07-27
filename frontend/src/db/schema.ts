import mongoose, { Schema, Document, Model } from "mongoose";

// Newsletter Subscriber
export interface INewsletterSubscriber extends Document {
  email: string;
  createdAt: Date;
}

const NewsletterSubscriberSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export const NewsletterSubscriber: Model<INewsletterSubscriber> =
  mongoose.models.NewsletterSubscriber ||
  mongoose.model<INewsletterSubscriber>("NewsletterSubscriber", NewsletterSubscriberSchema);


// Demo Booking
export interface IDemoBooking extends Document {
  name: string;
  email: string;
  company: string;
  useCase: string;
  createdAt: Date;
}

const DemoBookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  company: { type: String, required: true },
  useCase: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const DemoBooking: Model<IDemoBooking> =
  mongoose.models.DemoBooking || mongoose.model<IDemoBooking>("DemoBooking", DemoBookingSchema);


// User Generation
export interface IUserGeneration extends Document {
  userId: string;
  imageUrl: string;
  audioUrl: string;
  videoUrl: string;
  script?: string;
  avatarId?: string;
  avatarName?: string;
  voiceId?: string;
  voiceName?: string;
  likes: number;
  createdAt: Date;
}

const UserGenerationSchema: Schema = new Schema({
  userId: { type: String, required: true },
  imageUrl: { type: String, required: true },
  audioUrl: { type: String, required: true },
  videoUrl: { type: String, required: true },
  script: { type: String, required: false },
  avatarId: { type: String, required: false },
  avatarName: { type: String, required: false },
  voiceId: { type: String, required: false },
  voiceName: { type: String, required: false },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const UserGeneration: Model<IUserGeneration> =
  mongoose.models.UserGeneration || mongoose.model<IUserGeneration>("UserGeneration", UserGenerationSchema);


// User Auth
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  credits: number;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  avatarUrl: { type: String, required: false },
  credits: { type: Number, default: 20 },
  createdAt: { type: Date, default: Date.now },
});

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

