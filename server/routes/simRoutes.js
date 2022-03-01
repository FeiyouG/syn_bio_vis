// This module is an interface for routing

import express from 'express';

<<<<<<< HEAD
import { getSimRes, startSimReq, runPython } from '../controller/simulation.js';

const router = express.Router();

router.get('./', getSimRes);
router.post('./', startSimReq);
router.post('./json', runPython);
=======
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
>>>>>>> 05bbb27e7ac53ec1db3ffbd651bce2a42a865d1f

// Export router
export default router;
