import express from 'express';
import {
  deleteFile,
  downloadFile,
  getFile,
  getFiles,
  uploadFile,
} from './file.controller';
import { upload } from '../../common/middleware/upload.middleware';

const router = express.Router();

/*
 ************ FILE UPLOAD ROUTES *****************
 */
router.post('/upload', upload.single('file'), uploadFile);
router.get('/', getFiles);
router.get('/:id', getFile);
router.get('/download/:id', downloadFile);
router.delete('/:id', deleteFile);

export default router;