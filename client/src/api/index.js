import axios from 'axios';

// TODO: Change url for production code
const url = 'http://localhost:3000/sim'

// export const runSim = () => axios.get(url);
export const runSim = (newSim) => {
  // axios.get(url, newSim);
  axios.get(url, {
    param: {
      ID: 123
    }
  });
}

// export const runSim = (newSim) => axios.get(url, newSim);
