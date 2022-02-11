import { GET_SIM_RES, START_SIM_REQ } from '../constants/actionTypes';
import * as api from '../api';

export const getSimRes = () => async (dispatch) => {
  try {
    const { data } = await api.getSimRes();
    dispatch({ type: GET_SIM_RES, payload: data });
  } catch (error) {
    // TODO: Properly hanlde errors
    console.log(error.message);
  }
}

export const startSimReq = (newSim) => async (dispatch) => {
  try {
    const { data } = await api.startSimReq(newSim);
    dispatch({ type: START_SIM_REQ, payload: data });
  } catch (error) {
    // TODO: Properly hanlde errors
    console.log(error.message);
  }
}
