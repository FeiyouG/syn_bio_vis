import axios from 'axios';

// TODO: Change url for production code
const url = 'https://localhost:3000/sim'

export const fetchPosts = () => axios.get(url);
