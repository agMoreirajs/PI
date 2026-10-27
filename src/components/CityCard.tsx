import React from 'react';
import { TouchableOpacity, Text, ImageBackground, StyleSheet, View } from 'react-native';
import colors from '../theme/colors';

type City = {
  image: string;
  name: string;
  slogan: string;
};

type CityCardProps = {
  city: City;
  onPress?: () => void;
};

export default function CityCard({ city, onPress }: CityCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <ImageBackground source={{ uri: city.image }} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <Text style={styles.cityName}>{city.name}</Text>
          <Text style={styles.slogan}>{city.slogan}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 160,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  cityName: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
  },
  slogan: {
    color: '#E0E0E0',
    fontSize: 13,
    marginTop: 2,
  },
});