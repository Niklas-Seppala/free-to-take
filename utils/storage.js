import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'TOKEN';

/**
 * Store JWT to device permanent storage.
 *
 * @param {string} token JWT
 */
export const storeToken = async (token) => {
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get JWT token from device permanent storage.
 * @returns {Promise<string>} JWT
 */
export const getToken = async () => {
  return await AsyncStorage.getItem(TOKEN_KEY);
};

/**
 * Clear device permanent storeage.
 */
export const clearStorage = async () => {
  await AsyncStorage.clear();
};
