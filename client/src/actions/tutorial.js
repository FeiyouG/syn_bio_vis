// This moduel sends tutorial-related requests to the server
// import { RUN_SIM } from '../constants/actionTypes';
import * as api from '../api';
// import { dispatch } from 'd3';

// --------------------
// MARK: GET REQUESTs
// --------------------

// Get tutorial by its ID
export const getTutorial = (tutorialName, setTutorial) => async (dispatch) => {
  try {
    const { data } = await api.getTutorial(tutorialName);
    console.log(data)
    setTutorial(data)
  } catch (error) {
    // TODO: Properly hanlde errors
    console.log(error.message)
  }
}

// --------------------
// MARK: POST REQUESTs
// --------------------
