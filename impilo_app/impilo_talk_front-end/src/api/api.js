// src/services/api.js

import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const createEvent = async (token, eventDetails) => {
  try {
    const response = await axios.post(`${apiUrl}/create-event`, eventDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// Add more API functions as needed
