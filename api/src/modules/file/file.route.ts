import express from 'express';
import { uploadFile } from './file.controller';
import { upload } from '../../common/middleware/upload.middleware';

const router = express.Router();

/*
 ************ FILE UPLOAD ROUTES *****************
 */
router.post('/upload', upload.single("file"), uploadFile);

export default router;