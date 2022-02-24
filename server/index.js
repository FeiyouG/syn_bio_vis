import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import simRoutes from './routes/simRoutes.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// All routes inside routes/simRoutes must append "/sim" in the front
// app.use('/sim', simRoutes);
app.use('/sim', simRoutes);

// Start the server
// TODO: Change PORT for production code
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
