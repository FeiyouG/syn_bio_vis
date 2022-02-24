// This moduel sends simulation-related requests to the server
import { RUN_SIM } from '../constants/actionTypes';
import * as api from '../api';

// --------------------
// MARK: GET REQUESTs
// --------------------

// export const getSimRes = () => async (dispatch) => {
//   try {
//     const { data } = await api.getSimRes();
//     dispatch({ type: GET_SIM_RES, payload: data });
//   } catch (error) {
//     // TODO: Properly hanlde errors
//     console.log(error.message);
//   }
// }

// --------------------
// MARK: POST REQUESTs
// --------------------

// Run a simulation in the server and returns the result as json
export const runSim = (simData, drawSim) => async (dispatch) => {
  try {
    // Set request to the server
    const { data } = await api.runSim(simData);
    // Draw simulation using the data sent back from server
    drawSim(data);
  } catch (error) {
    // TODO: Properly hanlde errors
    console.log(error.message);
  }
}
