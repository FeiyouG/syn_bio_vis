import axios from 'axios';

// TODO: Change url for production code
const url = 'https://localhost:3000/sim'

export const getSimRes = () => axios.get(url);
export const startSimReq = (newSim) => axios.post(url, newSim);
