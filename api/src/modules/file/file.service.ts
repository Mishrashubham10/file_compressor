import { compressImg } from '../compression/compression.service';
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

  try {
    // 2. Only compress images (for now)
    if (file.mimetype.startsWith('image')) {
      const { outputPath, compressedSize } = await compressImg(file.path);

      // 3. Calculate compression ratio
      const compressionRatio = ((file.size - compressedSize) / file.size) * 100;

      // 4. Update DB
      newFile.compressedSize = compressedSize;
      newFile.compressedUrl = outputPath;
      newFile.compressedRatio = Number(compressionRatio.toFixed(2));
      newFile.status = 'DONE';

      await newFile.save();
    } else {
      newFile.status = 'DONE'; // skip for now
      await newFile.save();
    }

    return newFile;
  } catch (err) {
    newFile.status = 'PENDING';
    await newFile.save();
    throw err;
  }
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
