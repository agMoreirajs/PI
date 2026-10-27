import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CityCard from '../components/CityCard';
import { searchAll } from '../services/database';
import colors from '../theme/colors';

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string, params?: Record<string, unknown>) => void;
  };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadCities = async () => {
      const results = await searchAll(query);
      if (isMounted) {
        setCities(results);
      }
    };

    loadCities();

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <View style={styles.container}>
      <Header />
      <SearchBar value={query} onChangeText={setQuery} />
      <FlatList
        data={cities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CityCard
            city={item}
            onPress={() => navigation.navigate('Attractions', { cityId: item.id })}
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
  list: {
    paddingBottom: 20,
  },
});