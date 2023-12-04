// src/services/ApiService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1'; // Your Spring Boot application's API base URL

const fetchUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export { fetchUsers };
