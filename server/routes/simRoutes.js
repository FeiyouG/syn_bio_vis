import express from 'express';

import { getSimRes, startSimReq, runPython } from '../controller/simulation.js';

const router = express.Router();

router.get('./', getSimRes);
router.post('./', startSimReq);
router.post('./json', runPython);

export default router;
