import { fetchFromAPI } from './api';
import localCities from '../data/cities';
import localAttractions from '../data/attractions';

export const getCities = async () => {
  const apiData = await fetchFromAPI('/cities');
  if (apiData && Array.isArray(apiData)) {
    return apiData;
  }
  return localCities;
};

export const searchAll = async (query) => {
  if (!query) return await getCities();

  const apiData = await fetchFromAPI(`/search?q=${encodeURIComponent(query)}`);
  if (apiData && Array.isArray(apiData)) {
    return apiData;
  }

  const q = query.toLowerCase();
  return localCities.filter(
    (c) => c.name.toLowerCase().includes(q) || c.slogan.toLowerCase().includes(q)
  );
};