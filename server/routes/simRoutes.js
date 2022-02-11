import express from 'express';

import { getSimRes, startSimReq } from '../controller/simulation.js';

const router = express.Router();

router.get('./', getSimRes);
router.post('./', startSimReq);

export default router;
