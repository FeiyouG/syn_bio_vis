import axios from 'axios';

// TODO: Change url for production code
const simUrl = 'http://localhost:3000/sim'

// --------------------
// MARK: GET REQUESTs
// --------------------

// export const runSim = () => axios.get(url);

// --------------------
// MARK: POST REQUESTs
// --------------------

export const runSim = (newSim) => axios.post(simUrl, newSim);
