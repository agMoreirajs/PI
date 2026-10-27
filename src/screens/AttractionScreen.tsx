import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import AttractionCard from '../components/AttractionCard';
import { getFavorites, toggleFavoriteStorage } from '../services/storage';
import colors from '../theme/colors';

const database = require('../services/database') as {
  getCityById?: (id: string | number) => any;
  getCityByID?: (id: string | number) => any;
  getAttractionsByCity?: (id: string | number) => any[];
};

const getCityById = database.getCityById ?? database.getCityByID ?? (() => undefined);
const getAttractionsByCity = database.getAttractionsByCity ?? (() => []);

type AttractionsScreenProps = {
  route: {
    params: {
      cityId: string | number;
    };
  };
  navigation: any;
};

export default function AttractionsScreen({ route, navigation }: AttractionsScreenProps) {
  const { cityId } = route.params;
  const city = getCityById(cityId);
  const attractions = getAttractionsByCity(cityId);
  const [favorites, setFavorites] = useState<Array<string | number>>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs);
  };

  const handleToggleFavorite = async (id: string | number) => {
    const updated = await toggleFavoriteStorage(id);
    setFavorites(updated);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: city.image }} style={styles.heroImage} />
      <View style={styles.headerTitle}>
        <Text style={styles.cityName}>{city.name}</Text>
        <Text style={styles.slogan}>{city.slogan}</Text>
      </View>

      <FlatList
        data={attractions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AttractionCard
            attraction={item}
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={() => handleToggleFavorite(item.id)}
            onPress={() => navigation.navigate('Detail', { attractionId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  heroImage: {
    width: '100%',
    height: 180,
  },
  headerTitle: {
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  slogan: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  list: {
    paddingBottom: 20,
  },
});