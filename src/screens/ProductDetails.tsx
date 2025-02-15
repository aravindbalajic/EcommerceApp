import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, Title, Snackbar } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { RootStackParamList } from '../types/navigation';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { Product } from '../context/CartContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetails({ route }: Props) {
  const { product } = route.params;
  const { addToCart } = useCart();
  const [visible, setVisible] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Cover source={{ uri: product.image }} />
          <Card.Content>
            <Title style={styles.title}>{product.name}</Title>
            <Paragraph style={styles.price}>${product.price}</Paragraph>
            <Title style={styles.sectionTitle}>Description</Title>
            <Paragraph>{product.description}</Paragraph>
            
            <Title style={styles.sectionTitle}>Specifications</Title>
            <View style={styles.specs}>
              <Paragraph>Material: High-grade Steel</Paragraph>
              <Paragraph>Finish: Hot-rolled</Paragraph>
              <Paragraph>Standard: ASTM A36</Paragraph>
              <Paragraph>Length: Custom sizes available</Paragraph>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button 
              mode="contained" 
              style={styles.button}
              onPress={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        Item added to cart!
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginVertical: 8,
  },
  price: {
    fontSize: 20,
    color: '#1B3C73',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  specs: {
    gap: 8,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
  snackbar: {
    backgroundColor: '#1B3C73',
  },
}); 