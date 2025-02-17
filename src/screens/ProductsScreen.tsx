import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Searchbar, Snackbar, Chip } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { Product } from '../context/CartContext';

type RootStackParamList = {
  ProductDetails: { product: Product };
  Main: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const products = [
  // Raw Steel Products
  {
    id: 1,
    name: "Hot Rolled Steel Coils & Sheets",
    price: "799.99",
    description: "Premium quality hot rolled steel for construction and automotive applications",
    image: "https://i.imgur.com/steelcoil.jpg",
    category: "Raw Steel"
  },
  {
    id: 2,
    name: "Cold Rolled Steel Coils & Sheets",
    price: "899.99",
    description: "High-precision cold rolled steel for appliances and automotive bodies",
    image: "https://i.imgur.com/coldroll.jpg",
    category: "Raw Steel"
  },
  {
    id: 3,
    name: "Steel Ingots",
    price: "699.99",
    description: "High-quality steel ingots for manufacturing various steel products",
    image: "https://i.imgur.com/ingots.jpg",
    category: "Raw Steel"
  },
  // Structural Steel
  {
    id: 4,
    name: "Steel Channels",
    price: "499.99",
    description: "Versatile steel channels for framing and support structures",
    image: "https://i.imgur.com/channels.jpg",
    category: "Structural"
  },
  {
    id: 5,
    name: "Steel Angles",
    price: "399.99",
    description: "L-Angles and V-Angles for construction and industrial applications",
    image: "https://i.imgur.com/angles.jpg",
    category: "Structural"
  },
  // Reinforcement Steel
  {
    id: 6,
    name: "TMT Bars",
    price: "299.99",
    description: "Thermo-Mechanically Treated bars for concrete reinforcement",
    image: "https://i.imgur.com/tmtbars.jpg",
    category: "Reinforcement"
  },
  {
    id: 7,
    name: "Wire Rods",
    price: "249.99",
    description: "Quality wire rods for manufacturing wires and fasteners",
    image: "https://i.imgur.com/wirerods.jpg",
    category: "Reinforcement"
  },
  {
    id: 8,
    name: "Rebars",
    price: "279.99",
    description: "Reinforcement bars for concrete structures",
    image: "https://i.imgur.com/rebars.jpg",
    category: "Reinforcement"
  },
  // Stainless Steel
  {
    id: 9,
    name: "Stainless Steel Pipes & Tubes",
    price: "999.99",
    description: "High-grade stainless steel pipes for food processing and pharmaceuticals",
    image: "https://i.imgur.com/sspipes.jpg",
    category: "Stainless Steel"
  },
  {
    id: 10,
    name: "Stainless Steel Rods & Bars",
    price: "899.99",
    description: "Premium stainless steel rods for precision engineering",
    image: "https://i.imgur.com/ssrods.jpg",
    category: "Stainless Steel"
  },
  // Galvanized Products
  {
    id: 11,
    name: "Galvanized Steel",
    price: "599.99",
    description: "GI Sheets and Pipes for roofing and industrial applications",
    image: "https://i.imgur.com/galvanized.jpg",
    category: "Galvanized"
  },
  // Fabricated Products
  {
    id: 12,
    name: "Steel Mesh & Wire Fencing",
    price: "199.99",
    description: "High-quality mesh and fencing solutions for security",
    image: "https://i.imgur.com/mesh.jpg",
    category: "Fabricated"
  },
  {
    id: 13,
    name: "Steel Doors & Windows",
    price: "899.99",
    description: "Custom steel doors and windows for residential and commercial use",
    image: "https://i.imgur.com/doors.jpg",
    category: "Fabricated"
  },
  {
    id: 14,
    name: "Steel Fasteners",
    price: "99.99",
    description: "Premium nuts, bolts, screws, and washers for various applications",
    image: "https://i.imgur.com/fasteners.jpg",
    category: "Fabricated"
  },
  // Infrastructure Products
  {
    id: 15,
    name: "Pre-Engineered Steel Buildings",
    price: "9999.99",
    description: "Complete steel building solutions for warehouses and factories",
    image: "https://i.imgur.com/peb.jpg",
    category: "Infrastructure"
  },
  {
    id: 16,
    name: "Steel Railway Tracks",
    price: "1299.99",
    description: "High-grade steel tracks for railway infrastructure",
    image: "https://i.imgur.com/railway.jpg",
    category: "Infrastructure"
  },
  {
    id: 17,
    name: "Shipbuilding Steel",
    price: "1499.99",
    description: "Specialized steel for marine and offshore structures",
    image: "https://i.imgur.com/shipsteel.jpg",
    category: "Infrastructure"
  }
];

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
  const { addToCart } = useCart();
  const navigation = useNavigation<NavigationProp>();

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

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <Chip
            key={category}
            selected={category === selectedCategory}
            onPress={() => setSelectedCategory(category)}
            style={styles.categoryChip}
          >
            {category}
          </Chip>
        ))}
      </ScrollView>

      <ScrollView>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <Card key={product.id} style={styles.productCard}>
              <Card.Cover source={{ uri: product.image }} />
              <Card.Content>
                <Title>{product.name}</Title>
                <Paragraph style={styles.price}>₹{product.price}/kg</Paragraph>
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
  categoryScroll: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  categoryChip: {
    marginRight: 8,
    backgroundColor: '#f0f0f0',
  }
}); 