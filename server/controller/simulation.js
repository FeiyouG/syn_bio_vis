// This module contains functions triggered by
// simulation related post and get requests
// NOTE: HTTP Status Code Lookup:
// https://www.restapitutorial.com/httpstatuscodes.html

import { run_python } from "../utils/python.js";

// --------------------
// MARK: GET REQUESTs
// --------------------


// --------------------
// MARK: POST REQUEST
// --------------------

// Run a simulation and return the result to client
export const runSim = async (req, res) => {
  try {
    console.log("Request to start a simulation with input:");
    console.log(req.body);

    // TODO: Run the simulation here
    // result = runPython({filename: "hello.py", toehold: "", bm: ""});
    // runPython({filename: "utils/sim_strand_displacement.py", toehold: "", bm: ""});
    run_python("utils/sim_strand_displacement.py", "TCTA", "TCGACT", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      // console.log(stdout)
      res.send(stdout)
    })
    res.status(200);
    // console.log(result);
    // res.sendFile('example.json', { root: './src/simulation' })
  } catch (error) {
    // TODO: correctly handle error
    console.log(error)
    res.status(404).json({ message: error.message });
  }
}

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
