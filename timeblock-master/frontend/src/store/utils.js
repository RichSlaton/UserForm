import axios from 'axios';
import API from 'api';
export const post = async (route, payload = {}) => {
  let response = await axios.post(`${API}${route}`, payload);
  return response.data;
};

export const get = async (route) => {
  let response = await axios.get(`${API}${route}`);
  return response.data;
};

export const put = async (route, payload = {}) => {
  let response = await axios.put(`${API}${route}`, payload);
  return response.data;
};

export const del = async (route) => {
  let response = await axios.delete(`${API}${route}`);
  return response.data;
};
