import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAttractionById } from '../services/database';
import { Attraction } from '../data/attractions';
import colors from '../theme/colors';

interface DetailScreenProps {
  route: any;
}

export default function DetailScreen({ route }: DetailScreenProps) {
  const { attractionId } = route.params;
  const [attraction, setAttraction] = useState<Attraction | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAttraction();
  }, [attractionId]);

  const loadAttraction = async () => {
    setLoading(true);
    const data = await getAttractionById(attractionId);
    setAttraction(data);
    setLoading(false);
  };

  if (loading || !attraction) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: attraction.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.category}>{attraction.category}</Text>
        <Text style={styles.title}>{attraction.name}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{attraction.address}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color={colors.primary} />
          <Text style={styles.infoText}>{attraction.hours}</Text>
        </View>

        <Text style={styles.sectionTitle}>História e Importância</Text>
        <Text style={styles.description}>{attraction.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 240,
  },
  content: {
    padding: 20,
  },
  category: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginVertical: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
});