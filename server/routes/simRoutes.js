// This module is an interface for routing

import express from 'express';

import { runSim } from '../controller/simulation.js';

const router = express.Router();

// --------------------
// MARK: GET REQUESTs
// --------------------
// router.get('/', runSim);

// --------------------
// MARK: Post REQUESTs
// --------------------
router.post('/', runSim);

// Export router
export default router;
