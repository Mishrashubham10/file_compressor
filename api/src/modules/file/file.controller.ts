import { Request, Response, NextFunction } from 'express';
import {
  deleteFileById,
  getAllFiles,
  getFileById,
  getFilePath,
  getFileStatusService,
  handleFileUpload,
} from './file.service';
import path from 'path';
import { tryCatch } from 'bullmq';

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

/*
 ************ GET FILES CONTROLLER *****************
 */
export const getFiles = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const files = await getAllFiles();

    res.json({
      success: true,
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

/*
 ************ GET FILE CONTROLLER *****************
 */
export const getFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const file = await getFileById(req.params.id as string);

    res.json({
      success: true,
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

/*
 ************ DOWNLOAD FILE CONTROLLER *****************
 */
export const downloadFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const filePath = await getFilePath(req.params.id as string);

    res.download(path.resolve(filePath));
  } catch (err) {
    next(err);
  }
};

/*
 ************ DELETE FILE CONTROLLER *****************
 */
export const deleteFile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteFileById(req.params.id as string);

    res.json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};

/*
 ************ FILE PROGRESS CONTROLLER *****************
 */
export const getFileStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await getFileStatusService(req.params.id as string);

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};