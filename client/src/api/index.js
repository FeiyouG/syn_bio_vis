import axios from 'axios';

// TODO: Change url for production code
const simUrl = 'http://localhost:3001/sim'
const tutorUrl = 'http://localhost:3001/sim'

// --------------------
// MARK: GET REQUESTs
// --------------------
export const getTutorial = (tutorID) => axios.get(tutorUrl, tutorID)

// export const runSim = () => axios.get(url);

// --------------------
// MARK: POST REQUESTs
// --------------------
export const runSim = (newSim) => axios.post(simUrl, newSim);
