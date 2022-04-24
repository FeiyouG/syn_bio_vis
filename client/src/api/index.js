import axios from 'axios';

// TODO: Change url for production code
const simUrl = 'http://localhost:3001/sim'
const tutorUrl = 'http://localhost:3001/tutor'
// const simUrl = 'http://misl-a.cs.washington.edu:3210/sim'
// const tutorUrl = 'http://misl-a.cs.washington.edu:3210/tutor'

// --------------------
// MARK: GET REQUESTs
// --------------------
export const getTutorial = (tutorName) => axios.get(tutorUrl + "/" + tutorName)

// --------------------
// MARK: POST REQUESTs
// --------------------
export const runSim = (newSim) => axios.post(simUrl, newSim);
export const getSim = (simName) => axios.get(simUrl + "/" + simName);
