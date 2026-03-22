import { Request, Response, NextFunction } from 'express';
import { handleFileUpload } from './file.service';

/*
 ************ FILE UPLOAD CONTROLLER *****************
 */
export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    const result = await handleFileUpload(req.file);

    res.status(201).json({
      message: 'File uploaded successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};