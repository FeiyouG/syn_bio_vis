// This module is an interface for routing
import express from 'express';

import { runSim, getSim } from '../controller/simulation.js';

const router = express.Router();

// MARK: GET REQUESTs
router.get('/:simName', getSim);

// MARK: Post REQUESTs

// Recieve files
router.post('/', runSim);

// Export router
export default router;
