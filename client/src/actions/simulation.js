// This moduel sends simulation-related requests to the server
// import { RUN_SIM } from '../constants/actionTypes';
import * as api from '../api';
// import { dispatch } from 'd3';

// --------------------
// MARK: GET REQUESTs
// --------------------


// --------------------
// MARK: POST REQUESTs
// --------------------

// Run a simulation in the server and returns the result as json
export const runSim = (simData, setSimData) => async (dispatch) => {
  try {
    // Set request to the server
    const { data } = await api.runSim(simData);
    // Draw simulation using the data sent back from server
    setSimData(data);
  } catch (error) {
    // TODO: Properly hanlde errors
    console.log(error.message);
  }
}
