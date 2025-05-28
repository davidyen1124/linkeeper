import mongoose, { Document, Schema } from 'mongoose';

export interface IUrl extends Document {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  createdAt: Date;
}

const UrlSchema: Schema = new Schema({
  url: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUrl>('Url', UrlSchema); 