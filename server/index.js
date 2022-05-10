import express from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload'
// import multer from 'multer';
import cors from 'cors';

import simRoutes from './routes/simRoutes.js';
import tutorRoutes from './routes/tutorRoutes.js';

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload())

const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

// All routes inside routes/simRoutes must append "/sim" in the front
// app.use('/sim', simRoutes);
app.use('/sim', simRoutes);
app.use('/tutor', tutorRoutes);

// Start the server
// TODO: Change PORT for production code
const PORT = process.env.SERVER_PORT || 3001;
// const HOSTNAME = "0.0.0.0";
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
