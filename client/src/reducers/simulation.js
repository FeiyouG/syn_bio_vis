import { RUN_SIM } from '../constants/actionTypes';

export default (data = [], action) => {
  switch (action.type) {
    case RUN_SIM:
      return action.payload;
    // case some_post_req:
    //   return [...posts, action.payload];
    default:
      return data;
  };
}
