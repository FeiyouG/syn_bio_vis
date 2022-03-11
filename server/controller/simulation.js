// const __dirname = dirname(__filename);

// This module contains functions triggered by
// simulation related post and get requests
// NOTE: HTTP Status Code Lookup:
// https://www.restapitutorial.com/httpstatuscodes.html

// --------------------
// MARK: GET REQUESTs
// --------------------


// --------------------
// MARK: POST REQUEST
// --------------------

// Run a simulation and return the result to client
export const runSim = async (req, res) => {
  try {
    console.log("Request to tart a simulation with input:");
    console.log(req.body);

    // Run the simulation here
    res.status(200);
    res.sendFile('example.json', {root: './src'})
  } catch (error) {
    // TODO: correctly handle error
    console.log(error)
    res.status(404).json({ message: error.message });
  }
}
