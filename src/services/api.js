// src/services/api.js

import axios from 'axios';

// --- 1. Create a pre-configured Axios Instance ---
// This instance will be used for all API calls.
const apiClient = axios.create({
  baseURL: 'https://api.eatprotein.in/', // Your base API URL
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    // Accept: 'application/json',
    // --- ADDED API ACCESS KEY ---
    // IMPORTANT: Store your key securely using environment variables
    // and not directly in the code for production apps.
    'api-access-key': 'A31AB78E-C4C7-4C9E-AD98-6D6A1B801E45',
  },
});

// --- 2. Request Interceptor ---
// This function will run BEFORE every request is sent.
// It's the perfect place to add the dynamic authentication token.
apiClient.interceptors.request.use(
  async (config) => {
    // Try to get the auth token from storage
    const token = await localStorage.getItem("@auth_token") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// --- 3. Response Interceptor ---
// This function will run AFTER every response is received.
// It's perfect for global error handling, like logging out on 401.
apiClient.interceptors.response.use(
  (response) => {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // You can modify the response data here if needed
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx causes this function to trigger
    if (error.response?.status === 401) {
      // Handle Unauthorized error globally
      console.warn('Unauthorized! Logging out.');
      await AsyncStorage.removeItem('@auth_token');
      // You would navigate to the login screen here, e.g., using a navigation service
      // NavigationService.navigate('Login');
    }
    // You can also handle other common errors like 500, 404 etc.
    return Promise.reject(error);
  }
);


// --- 4. The Core Request Function ---
// This is a generic function that will handle all HTTP methods.
const request = async (method, url, data = null, params = null) => {
    console.log('req is ', method, url, data, params)
  try {
    const response = await apiClient({
      method,
      url,
      data,
      params,
    });
    // Return the relevant part of the response
    console.log('API Request resp is:', response.data);
    return response.data;
  } catch (error) {
    // Let the component handle the specific error
    // You can format the error message here if you want
    console.log('API Request Error:', error.response?.data || error.message);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

// --- 5. Convenience Method Exports ---
// These provide a clean and easy-to-use API for the rest of your app.

/**
 * Performs a GET request.
 * @param {string} url - The endpoint URL (e.g., '/users').
 * @param {object} params - URL query parameters.
 */
export const get = (url, params) => request('GET', url, null, params);

/**
 * Performs a POST request.
 * @param {string} url - The endpoint URL (e.g., '/login').
 * @param {object} data - The request body.
 */
export const post = (url, data) => request('POST', url, data);

/**
 * Performs a PUT request.
 * @param {string} url - The endpoint URL (e.g., '/users/123').
 * @param {object} data - The request body.
 */
export const put = (url, data) => request('PUT', url, data);

/**
 * Performs a PATCH request.
 * @param {string} url - The endpoint URL (e.g., '/users/123').
 * @param {object} data - The request body.
 */
export const patch = (url, data) => request('PATCH', url, data);

/**
 * Performs a DELETE request.
 * @param {string} url - The endpoint URL (e.g., '/users/123').
 */
export const del = (url) => request('DELETE', url); // 'del' because 'delete' is a reserved keyword
