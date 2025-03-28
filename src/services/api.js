import axios from "axios";

const API_URL = "https://reqres.in/api";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

export const fetchUsers = async (page) => {
  const response = await axios.get(`${API_URL}/users?page=${page}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${API_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
    return true; 
  } catch (error) {
    console.error("Error deleting user:", error);
    return false;
  }
};

export const fetchUserById = async (id) => {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data; 
  };
  