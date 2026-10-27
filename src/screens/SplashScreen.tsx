import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

export default function SplashScreen({
  navigation,
}: {
  navigation: {
    replace: (screen: string) => void;
  };
}) {
  return (
    <View style={styles.container}>
      <Ionicons name="compass" size={100} color={colors.primary} />
      <Text style={styles.title}>ROTEIRO CAIÇARA</Text>
      <Text style={styles.subtitle}>BAIXADA SANTISTA</Text>
      <Text style={styles.description}>Explore as 9 cidades e descubra os melhores pontos turísticos do litoral.</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.replace('MainTabs')}
      >
        <Text style={styles.buttonText}>Venha se aventurar!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.accent,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});