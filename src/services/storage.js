import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@roteiro_caicara_favorites';

export const getFavorites = async () => {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return [];
  }
};

export const toggleFavoriteStorage = async (attractionId) => {
  try {
    const favorites = await getFavorites();
    let updated;
    if (favorites.includes(attractionId)) {
      updated = favorites.filter(id => id !== attractionId);
    } else {
      updated = [...favorites, attractionId];
    }
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Erro ao salvar favorito:', error);
    return [];
  }
};