// This module contains functions triggered by
// tutorial related post and get requests
// NOTE: HTTP Status Code Lookup:
// https://www.restapitutorial.com/httpstatuscodes.html

// --------------------
// MARK: GET REQUESTs
// --------------------


// --------------------
// MARK: POST REQUEST
// --------------------

// Run a simulation and return the result to client
export const getTutorial = async (req, res) => {
  try {
    console.log("Request ot get tutorial");
    console.log(req.body);
    // Run the simulation here
    res.status(200).json({ message: "Greeting from the Server 👋" })
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}
