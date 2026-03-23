import dotenv from "dotenv";
dotenv.config();
import app from './app';
import { connectDB } from './config/db';
import "./modules/compression/compression.worker";

const PORT = process.env.PORT || 4000;

/*
 *********** DB CONNECTION **************
 */
connectDB();

/*
 *********** LISTEN TO SERVER **************
 */
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});