export type FileStatus = 'PENDING' | 'PROCESSING' | 'DONE';

export interface IFile {
  _id: string;
  originalName: string;
  originalSize: number;
  compressedSize?: number;
  compressedRatio?: number;
  fileType: string;
  originalUrl: string;
  compressedUrl?: string;
  status: FileStatus;
  progress: number;
  createdAt: string;
  updatedAt: string;
}