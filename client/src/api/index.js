import axios from 'axios';

// TODO: Change url for production code
const simUrl = 'http://localhost:3001/sim'
const tutorUrl = 'http://localhost:3001/tutor'

// --------------------
// MARK: GET REQUESTs
// --------------------
export const getTutorial = (tutorName) => axios.get(tutorUrl + "/" + tutorName)
// export const runSim = () => axios.get(url);

// --------------------
// MARK: POST REQUESTs
// --------------------
export const runSim = (newSim) => axios.post(simUrl, newSim);
