import { Request, Response, NextFunction } from 'express';

/*
 ************* GLOBAL ERROR HANDLER *****************
 */
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.message === 'Invalid file type') {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ message: 'File too large' });
  }

  console.error(err.stack);

  res.status(err.statusCode || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;