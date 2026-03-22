import { compressImg } from '../compression/compression.service';
import fileModel from './file.model';

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