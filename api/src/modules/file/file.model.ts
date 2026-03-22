import mongoose, { Document, Schema } from 'mongoose';

/*
 *********** FILE INTERFACE **************
 */
export interface IFile extends Document {
  user?: mongoose.Types.ObjectId;
  originalName: string;
  originalSize: number;
  compressedSize?: number;
  compressedRatio?: number;
  fileType: string;
  originalUrl: string;
  compressedUrl?: string;
  status: 'PENDING' | 'PROCESSING' | 'DONE';
}

/*
 *********** FILE SCHEMA **************
 */
const fileSchema = new Schema<IFile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    originalName: { type: String, required: true },
    originalSize: { type: Number, required: true },
    compressedSize: Number,
    compressedRatio: Number,
    fileType: { type: String, required: true },
    originalUrl: { type: String, required: true },
    compressedUrl: String,
    status: {
      type: String,
      enum: ['PENDING', 'PROCESSING', 'DONE'],
      default: 'PENDING',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IFile>('File', fileSchema);