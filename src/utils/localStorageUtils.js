/**
 * Utility to manage LocalStorage with error handling and JSON parsing
 */

const STORAGE_KEY = "shippingInfo";

export const localStorageUtils = {
  saveShippingInfo: (data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEY, serializedData);
    } catch (error) {
      console.error("Could not save shipping info", error);
    }
  },

  getShippingInfo: () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData === null) return null;
      return JSON.parse(savedData);
    } catch (error) {
      console.error("Could not load shipping info", error);
      return null;
    }
  },

  clearShippingInfo: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = window.localStorage.getItem(key);
    // If there is data, parse the JSON; otherwise, return the defaul value
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error when get "${key}" from LocalStorage:`, error);
    return defaultValue;
  }
};
