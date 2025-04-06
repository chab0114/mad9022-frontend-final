import axios from 'axios';

const API_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export const fetchCraps = async (keyword = '', distance = 10) => {
  try {
    const response = await api.get(`/api/crap`, {
      params: {
        query: keyword,
        distance: distance
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching craps:', error);
    throw error;
  }
};

export default api;