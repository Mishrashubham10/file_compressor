import { Request } from 'express';

/*
 ************* EXTEND EXPRESS TYPES ***************
 */
declare module 'express-serve-static-core' {
  interface Request {
    file?: Express.Multer.File;
  }
}