// This moduel sends simulation-related requests to the server
// import { RUN_SIM } from '../constants/actionTypes';
import * as api from '../api';

// --------------------
// MARK: GET REQUESTs
// --------------------


// --------------------
// MARK: POST REQUESTs
// --------------------

// Run a simulation in the server and returns the result as json
export const runSim = (formData, setSimData) => async (dispatch) => {
  try {

    const { status, data } = await api.runSim(formData);
    if (status )
    console.log(JSON.parse(data))
    setSimData(JSON.parse(data));
  } catch (error) {
    setSimData({ message: `${error.response.data.message}`})
  }
}

export const getSim = (simName, setSimData) => async (dispatch) => {
  try {
    // Set request to the server
    const { data } = await api.getSim(simName)
    // Draw simulation using the data sent back from server
    setSimData(data);

    return data;
  } catch (error) {
    // TODO: Properly hanlde errors
    console.log(error.message);
  }
}

