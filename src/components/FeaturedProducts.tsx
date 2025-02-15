import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

export function FeaturedProducts() {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Featured Products</Title>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {/* Placeholder cards - replace with real data later */}
        <Card style={styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/200' }} />
          <Card.Content>
            <Title>Steel Beam</Title>
            <Paragraph>High quality construction steel</Paragraph>
          </Card.Content>
        </Card>
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
  card: {
    width: 200,
    marginRight: 16,
  },
}); 