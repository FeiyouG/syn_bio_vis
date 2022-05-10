// This module contains functions triggered by
// simulation related post and get requests

import { runPython } from "../utils/python.js";


// MARK: CONSTANTS
const SDSIMULATION_PY = "simulation/SDSimulation.py"
// const SDSIMULATION_PY = "simulation/SDSimulation_domain.py"

// --------------------
// MARK: GET REQUESTs
// --------------------
// Run a simulation and return the result to client
export const getSim = async (req, res) => {
  try {
    const simName = req.params.simName
    console.log("Request to get simulation/" + simName);

    res.status(200)
    res.sendFile(simName + ".json", { root: './src/simulation' })
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}


// --------------------
// MARK: POST REQUEST
// --------------------

// Run a simulation and return the result to client
export const runSim = async (req, res) => {
  try {
    console.log("Request to start a simulation with input:");

    const args = `${req.files.pilFile.data}`.split("\n")
    console.log(args)

    runPython(SDSIMULATION_PY, args, (status, data) => {
      res.status(status).json(data).end()
    })

  } catch (error) {
    // TODO: correctly handle error
    console.log(error)
    res.status(404).json({ message: error.message });
  }
}

