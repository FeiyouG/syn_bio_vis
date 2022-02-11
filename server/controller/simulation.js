export const getSimRes = async (req, res) => {
  try {
    console.log("Fetching simulation result");
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}

export const startSimReq = async (req, res) => {
  try {
    console.log("Start simulation");
  } catch (error) {
    // TODO: correctly handle error
    res.status(404).json({ message: error.message });
  }
}
