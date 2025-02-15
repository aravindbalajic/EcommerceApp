import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Text, TextInput } from 'react-native-paper';
import { useCart } from '../context/CartContext';

export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: string }>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id!]: '1' }), {})
  );
  
  const calculateItemTotal = (price: string, quantity: string) => {
    return (parseFloat(price) * (parseFloat(quantity) || 0)).toFixed(2);
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + parseFloat(calculateItemTotal(item.price, quantities[item.id!]));
  }, 0);

  const handleQuantityChange = (id: number, value: string) => {
    // Only allow numbers and decimals
    if (/^\d*\.?\d*$/.test(value)) {
      setQuantities({ ...quantities, [id]: value });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyText}>Your cart is empty</Text>
        ) : (
          cartItems.map((item) => (
            <Card key={item.id} style={styles.cartItem}>
              <Card.Content>
                <View style={styles.cartContent}>
                  <View style={styles.itemInfo}>
                    <Title>{item.name}</Title>
                    <Paragraph>₹{item.price}/kg</Paragraph>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TextInput
                      mode="outlined"
                      label="Quantity (kg)"
                      value={quantities[item.id!]}
                      onChangeText={(value) => handleQuantityChange(item.id!, value)}
                      keyboardType="decimal-pad"
                      style={styles.quantityInput}
                    />
                    <Paragraph style={styles.itemTotal}>
                      Total: ₹{calculateItemTotal(item.price, quantities[item.id!])}
                    </Paragraph>
                    <Button 
                      onPress={() => removeFromCart(item.id!)}
                      color="red"
                    >
                      Remove
                    </Button>
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
      
      {cartItems.length > 0 && (
        <Card style={styles.totalCard}>
          <Card.Content>
            <View style={styles.totalContainer}>
              <Title>Total: ₹{total.toFixed(2)}</Title>
              <Button 
                mode="contained" 
                onPress={() => {/* Implement checkout */}}
                style={styles.checkoutButton}
              >
                Checkout
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  cartItem: {
    margin: 8,
  },
  cartContent: {
    flexDirection: 'column',
    gap: 12,
  },
  itemInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  quantityInput: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
  },
  itemTotal: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  totalCard: {
    margin: 8,
    backgroundColor: '#f5f5f5',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#1B3C73',
  },
}); 