import { compressionQueue } from '../compression/compression.queue';
import fileModel from './file.model';
import fs from 'fs/promises';

/*
 ************ FILE UPLOAD SERVICE *****************
 */
export const handleFileUpload = async (file: Express.Multer.File) => {
  // 1. Save initial file
  const newFile = await fileModel.create({
    originalName: file.originalname,
    originalSize: file.size,
    fileType: file.mimetype,
    originalUrl: file.path,
    status: 'PROCESSING',
  });

  // ADD JOB TO THE QUEUE
  await compressionQueue.add('compress-file', {
    fileId: newFile._id,
    filePath: file.path,
    mimeType: file.mimetype,
    originalSize: file.size,
  });

  return newFile;
};

/*
 ************ GET ALL FILES SERVICE *****************
 */
export const getAllFiles = async () => {
  return await fileModel.find().sort({ createdAt: -1 });
};

/*
 ************ GET FILE SERVICE *****************
 */
export const getFileById = async (id: string) => {
  const file = await fileModel.findById(id);

  if (!file) throw new Error('File not found');

  return file;
};

/*
 ************ DOWNLOAD FILE SERVICE *****************
 */
export const getFilePath = async (id: string) => {
  const file = await fileModel.findById(id);

  console.log('FILE:', file);

  if (!file || !file.compressedUrl) {
    throw new Error('File not available');
  }

  if (file.status !== 'DONE') {
    throw new Error('File is not ready for download yet');
  }

  if (!file.compressedUrl) {
    throw new Error('Compressed file missing');
  }

  return file.compressedUrl || file.originalUrl;
};

/*
 ************ DELETE FILE SERVICE *****************
 */
export const deleteFileById = async (id: string) => {
  const file = await fileModel.findById(id);

  if (!file) throw new Error('File not found');

  // DELETE ORIGINAL FILE
  if (file.originalUrl) {
    await fs.unlink(file.originalUrl).catch(() => {});
  }

  // DELETE COMPRESSED FILE
  if (file.compressedUrl) {
    await fs.unlink(file.compressedUrl).catch(() => {});
  }

  await file.deleteOne();

  return true;
};

/*
 ************ FILE STATUS SERVICE *****************
 */
export const getFileStatusService = async (id: string) => {
  const file = await fileModel.findById(id);

  if (!file) throw new Error('File not found');

  return {
    status: file.status,
    progress: file.progress,
    compressedUrl: file.compressedUrl,
  };
};