import express from 'express';

const router = express.Router();

router.get('./', async (req, res) => {
  res.status(200).json({simulation: "SIMULATION GOES HERE"});
});

export default router;
