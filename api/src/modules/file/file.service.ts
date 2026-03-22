import fileModel from './file.model';

/*
 ************ FILE UPLOAD SERVICE *****************
 */
export const handleFileUpload = async (file: Express.Multer.File) => {
  const newFile = await fileModel.create({
    originalName: file.originalname,
    originalSize: file.size,
    fileType: file.mimetype,
    originalUrl: file.path,
    status: 'PENDING',
  });

  return newFile;
};