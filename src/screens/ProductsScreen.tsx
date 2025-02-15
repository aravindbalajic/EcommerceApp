import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Snackbar } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Product } from '../context/CartContext';

type RootStackParamList = {
  ProductDetails: { product: Product };
  Main: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [visible, setVisible] = useState(false);
  const { addToCart } = useCart();
  const navigation = useNavigation<NavigationProp>();

  const handleProductDetails = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      
      <ScrollView>
        <View style={styles.productsGrid}>
          {products.map((product, index) => (
            <Card key={index} style={styles.productCard}>
              <Card.Cover source={{ uri: product.image }} />
              <Card.Content>
                <Title>{product.name}</Title>
                <Paragraph style={styles.price}>${product.price}</Paragraph>
                <Paragraph numberOfLines={2}>{product.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => handleProductDetails(product)}>
                  Details
                </Button>
                <Button 
                  mode="contained" 
                  onPress={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
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

const products = [
  {
    id: 1,
    name: "Steel I-Beam",
    price: "599.99",
    description: "High-strength structural steel I-beam for construction",
    image: "https://picsum.photos/700"
  },
  {
    id: 2,
    name: "Steel Pipe",
    price: "299.99",
    description: "Seamless steel pipe for industrial applications",
    image: "https://picsum.photos/701"
  },
  {
    id: 3,
    name: "Steel Sheet",
    price: "199.99",
    description: "Cold-rolled steel sheet, perfect for manufacturing",
    image: "https://picsum.photos/702"
  },
  {
    id: 4,
    name: "Steel Rod",
    price: "149.99",
    description: "Solid steel rod for various industrial uses",
    image: "https://picsum.photos/703"
  },
  {
    id: 5,
    name: "Angle Iron",
    price: "89.99",
    description: "L-shaped steel angle for structural support",
    image: "https://picsum.photos/704"
  },
  {
    id: 6,
    name: "Steel Channel",
    price: "259.99",
    description: "C-channel steel for construction projects",
    image: "https://picsum.photos/705"
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    margin: 16,
  },
  productsGrid: {
    padding: 8,
    gap: 16,
  },
  productCard: {
    margin: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B3C73',
    marginVertical: 4,
  },
  snackbar: {
    backgroundColor: '#1B3C73',
  },
}); 