import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'restaurants';

export const createTable = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (!data) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  } catch (error) {
    console.error('Error creating storage:', error);
  }
};

export const getRestaurants = async (setRestaurants) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      setRestaurants(JSON.parse(data));
    }
  } catch (error) {
    console.error('Error fetching restaurants:', error);
  }
};

export const addRestaurant = async (restaurant) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const restaurants = data ? JSON.parse(data) : [];
    restaurants.push({ id: Date.now(), ...restaurant });
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
  } catch (error) {
    console.error('Error adding restaurant:', error);
  }
};

export const updateRestaurant = async (updatedRestaurant) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const restaurants = data ? JSON.parse(data) : [];
    const updatedList = restaurants.map((item) =>
      item.id === updatedRestaurant.id ? updatedRestaurant : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  } catch (error) {
    console.error('Error updating restaurant:', error);
  }
};


export const deleteRestaurant = async (id) => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    if (data) {
      const restaurants = JSON.parse(data).filter((item) => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
    }
  } catch (error) {
    console.error('Error deleting restaurant:', error);
  }
};
