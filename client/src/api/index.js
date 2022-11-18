import axios from 'axios';

// TODO: Change url for production code
const simUrl = 'http://localhost:3001/sim'
const tutorUrl = 'http://localhost:3001/tutor'
//const simUrl = 'http://misl-a.cs.washington.edu:3210/sim'
//const tutorUrl = 'http://misl-a.cs.washington.edu:3210/tutor'

// MARK: GET REQUESTs
export const getTutorial = (tutorName) => axios.get(tutorUrl + "/" + tutorName)
export const getSim = (simName) => axios.get(simUrl + "/" + simName);


// MARK: POST REQUESTs
export const runSim = (formData) => axios.post(simUrl, formData, {
   headers: {
     'Content-Type': 'multipart/form-data',
     'enctype': 'multipart/form-data'
   }
 });
