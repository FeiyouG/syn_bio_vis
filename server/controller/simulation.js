// This module contains functions triggered by post and get requests
// from the clients
// NOTE: HTTP Status Code Lookup:
// https://www.restapitutorial.com/httpstatuscodes.html

// --------------------
// MARK: GET REQUESTs
// --------------------

// Run a simulation and return the result to client
export const runSim = async (req, res) => {
  try {
    console.log("Start simulation");
    console.log(req.body);
    res.status(200).json({ message: "HERE" })
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}

// --------------------
// MARK: POST REQUEST
// --------------------

