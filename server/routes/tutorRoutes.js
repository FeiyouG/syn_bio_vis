// This module is an interface for routing

import express from 'express';

import { getTutorial } from '../controller/tutorial.js';

const router = express.Router();

// --------------------
// MARK: GET REQUESTs
// --------------------
router.get('/:lessonName', getTutorial);

// --------------------
// MARK: Post REQUESTs
// --------------------

// Export router
export default router;
