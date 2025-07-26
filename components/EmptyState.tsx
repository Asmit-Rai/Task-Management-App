import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  message: string;
  loading?: boolean; // Add loading prop
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, loading }) => {
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#878AF5" style={styles.icon} />
      ) : (
        <MaterialCommunityIcons
          name="clipboard-text-outline"
          size={56}
          color="#878AF5"
          style={styles.icon}
        />
      )}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default EmptyState;