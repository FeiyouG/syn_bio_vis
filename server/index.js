import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import simRoutes from './routes/simRoutes.js';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/sim', simRoutes);

// TODO: Change PORT for production code
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
