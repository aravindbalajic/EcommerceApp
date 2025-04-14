import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Snackbar, Chip } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { getProducts } from '../services/api';

type Product = {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
};

type RootStackParamList = {
  ProductDetails: { product: Product };
  Main: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const categories = [
  'All',
  'Raw Steel',
  'Structural',
  'Reinforcement',
  'Stainless Steel',
  'Galvanized',
  'Fabricated',
  'Infrastructure'
];

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductDetails = (product: Product) => {
    navigation.navigate('ProductDetails', { product });
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setVisible(true);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Title>Error: {error}</Title>
        <Button mode="contained" onPress={fetchProducts}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {categories.map((category) => (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView style={styles.productList}>
        {filteredProducts.map((product) => (
          <Card key={product._id} style={styles.card}>
            <Card.Cover source={{ uri: product.image }} style={styles.cardImage} />
            <Card.Content>
              <Title>{product.name}</Title>
              <Paragraph>₹{product.price}</Paragraph>
              <Paragraph numberOfLines={2}>{product.description}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleProductDetails(product)}>Details</Button>
              <Button mode="contained" onPress={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        duration={2000}
      >
        Item added to cart
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 10,
    elevation: 2,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categoryChip: {
    marginRight: 8,
  },
  productList: {
    padding: 10,
  },
  card: {
    marginBottom: 15,
    elevation: 3,
  },
  cardImage: {
    height: 200,
  },
}); 