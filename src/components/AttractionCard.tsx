import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FavoriteButton from './FavoriteButton';
import colors from '../theme/colors';

type Attraction = {
  image: string;
  category: string;
  name: string;
  address: string;
};

type AttractionCardProps = {
  attraction: Attraction;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onPress: () => void;
};

export default function AttractionCard({
  attraction,
  isFavorite,
  onToggleFavorite,
  onPress,
}: AttractionCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: attraction.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{attraction.category}</Text>
        <Text style={styles.title}>{attraction.name}</Text>
        <Text style={styles.address} numberOfLines={1}>{attraction.address}</Text>
      </View>
      <View style={styles.favContainer}>
        <FavoriteButton isFavorite={isFavorite} onPress={onToggleFavorite} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
  },
  category: {
    fontSize: 11,
    color: colors.accent,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 2,
  },
  address: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  favContainer: {
    paddingRight: 4,
  },
});