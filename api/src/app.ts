import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';

/*
 ************ GLOBAL ERROR HANDLER ***************
 */
import errorHandler from './common/middleware/error.middleware';

/*
 *************** ROUTES IMPORTS ***************
 */
import fileRoutes from './modules/file/file.route';

const app: Application = express();

/*
 ********** GLOBAL MIDDLEWARES ************
 */
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
  }),
);
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use(morgan('dev'));

app.use(errorHandler);

/*
 ********** GLOBAL ROUTES ************
 */
app.use('/api/v1/files', fileRoutes);

export default app;