/**
 * Removes all whitespace characters (spaces, tabs, newlines, etc.) from a string.
 * This is the most robust and recommended method.
 * @param {string} str - The input string.
 * @returns {string} The string without any whitespace.
 */
export const removeWhitespaces = (str) => {
  // The \s+ regex matches one or more whitespace characters.
  // The 'g' flag ensures all occurrences are replaced.
  return str.replace(/\s+/g, '');
};

/**
 * Removes all regular space characters (' ') from a string.
 * This method only targets spaces and will not remove tabs or newlines.
 * @param {string} str - The input string.
 * @returns {string} The string without any spaces.
 */
export const removeSpaces = (str) => {
  // replaceAll() is a modern JavaScript method. If you need to support older browsers,
  // you can use a regex: str.replace(/ /g, '');
  return str.replaceAll(' ', '');
};

/**
 * Removes leading and trailing whitespace from a string.
 * This is a standard JavaScript method.
 * @param {string} str - The input string.
 * @returns {string} The string without leading/trailing whitespace.
 */
export const trimString = (str) => {
  return str.trim();
};

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - The input string.
 * @returns {string} The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Checks if a string is empty or only contains whitespace.
 * @param {string} str - The input string.
 * @returns {boolean} True if the string is empty or whitespace-only.
 */
export const isEmptyOrWhitespace = (str) => {
  // Trim whitespace and check if the result is an empty string.
  return !str || str.trim() === '';
};

/**
 * Checks if a string is a valid email format.
 * This is a simple but effective regex for email validation.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export const isValidEmail = (email) => {
  // A more robust regex for email validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Reverses a string.
 * @param {string} str - The input string to reverse.
 * @returns {string} The reversed string.
 */
export const reverseString = (str) => {
    console.log(str);
  // 1. Split the string into an array of characters.
  // 2. Reverse the array.
  // 3. Join the array back into a string.
  return str.split('').reverse().join('');
};

export const getFirstLetterCases = (str) => {
  // Handle null, undefined, or empty strings
  if (!str) {
    return { capital: '', small: '' };
  }

  const firstLetter = str.charAt(0);
  return {
    capital: firstLetter.toUpperCase(),
    small: firstLetter.toLowerCase(),
  };
};

export const formatToTwoDecimals = (value) => {
  // Use parseFloat to handle string inputs like "123.45"
  const number = parseFloat(value);

  // Check if the result is a valid number
  if (isNaN(number)) {
    return '0.00'; // Return a default for invalid inputs
  }

  // Use toFixed(2) to format the number to two decimal places.
  // toFixed returns a string, which is perfect for display.
  return number.toFixed(2);
};