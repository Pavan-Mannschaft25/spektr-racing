import {
  isEmptyOrWhitespace,
  isValidEmail,
  removeWhitespaces,
  reverseString,
} from '../../utils/stringUtils';
import { get, post, put } from '../api'

// Function to log in a user
export const loginUser = async (mobile, otp) => {
  // The 'post' function handles the full URL construction:
  // https://www.eatprotine.in/repo/auth/login
  const response = await post('/auth/login', { mobile, otp });
  // Assuming your API returns the token upon successful login
  if (response.token) {
    await localStorage.setItem("@auth_token", response.token);
  }
  return response;
};

// Function to get user profile
export const getUserProfile = async () => {
  // The 'get' function handles the request
  // https://www.eatprotine.in/repo/user/profile
  return await get('/user/profile');
};

export const checkUser = async username => {
  const response = await post('User/checkUser', { username });
  return response;
};

// --- NEW FUNCTION TO REGISTER A USER ---
export const registerUser = async (name, email, phonenumber, osType) => {
  // Basic client-side validation
  if (isEmptyOrWhitespace(name)) {
    throw new Error('Name cannot be empty.');
  }
  if (!isValidEmail(email)) {
    throw new Error('Please enter a valid email address.');
  }

  // Clean the input before sending
  const cleanedName = removeWhitespaces(name);
  const cleanedEmail = removeWhitespaces(email);
  const cleanedMobile = removeWhitespaces(phonenumber);

  try {
    // The 'post' function handles the full URL construction:
    // https://www.eatprotine.in/repo/auth/register
    const response = await post('User/addUser', {
      name: name,
      email: cleanedEmail,
      password: reverseString(phonenumber),
      role_id: '5',
      status: 'ACTIVE',
      phone: cleanedMobile,
      referCode: '',
      referBy: '',
      city: 'kavali',
      dbLat: '14.9118615',
      dbLng: '79.9794695',
      osType: osType,
    });

    // // Assuming your API returns a token upon successful registration
    // if (response.token) {
    //   await AsyncStorage.setItem('@auth_token', response.token);
    // }
    return response;
  } catch (error) {
    // Re-throw the error to be handled by the UI component
    throw error;
  }
};

export const deleteEPUser = async id => {
  return await get(`User/delete?id=${id}`);
};

export const getNearByD_BoysList = async (lat, lng, roleId) => {
  try {
    const response = await get(
      `User/getNearbyUsers?lat=${lat}&lng=${lng}&roleId=${roleId}`,
      null,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserToken = async (fcmToken, platform, userId) => {
  try {
    const resp = await put('User/update', {
      token: fcmToken,
      osType: platform,
      id: userId,
    });
    return resp;
  } catch (e) {
    throw error;
  }
}