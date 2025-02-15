import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip, Title } from 'react-native-paper';

export function CategoryList() {
  const categories = ['All', 'Beams', 'Pipes', 'Sheets', 'Rods'];

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Categories</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <Chip
            key={category}
            style={styles.chip}
            onPress={() => {}}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  chip: {
    marginRight: 8,
  },
}); 