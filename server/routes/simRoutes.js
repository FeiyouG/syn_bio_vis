// This module is an interface for routing

import express from 'express';

import { runSim, getSim } from '../controller/simulation.js';

const router = express.Router();

// --------------------
// MARK: GET REQUESTs
// --------------------

// --------------------
// MARK: Post REQUESTs
// --------------------
router.post('/', runSim);
router.get('/:simName', getSim);
// Export router
export default router;
