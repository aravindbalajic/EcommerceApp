import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Text, TextInput, Portal, Dialog, RadioButton } from 'react-native-paper';
import { useCart } from '../context/CartContext';

type PaymentMethod = 'card' | 'upi' | 'netbanking';

export default function CartScreen() {
  const { cartItems, removeFromCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: string }>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id!]: '1' }), {})
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    upiId: '',
    bankName: ''
  });
  
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

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handlePayment = () => {
    // Here you would integrate with a payment gateway
    alert('Order placed successfully!');
    setShowCheckout(false);
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <>
            <TextInput
              label="Card Number"
              value={paymentDetails.cardNumber}
              onChangeText={(text) => setPaymentDetails({ ...paymentDetails, cardNumber: text })}
              style={styles.input}
              keyboardType="numeric"
            />
            <View style={styles.cardDetails}>
              <TextInput
                label="MM/YY"
                style={[styles.input, { flex: 1, marginRight: 8 }]}
                keyboardType="numeric"
              />
              <TextInput
                label="CVV"
                style={[styles.input, { flex: 1 }]}
                keyboardType="numeric"
                secureTextEntry
              />
            </View>
          </>
        );
      case 'upi':
        return (
          <TextInput
            label="UPI ID"
            value={paymentDetails.upiId}
            onChangeText={(text) => setPaymentDetails({ ...paymentDetails, upiId: text })}
            style={styles.input}
            placeholder="example@upi"
          />
        );
      case 'netbanking':
        return (
          <TextInput
            label="Bank Name"
            value={paymentDetails.bankName}
            onChangeText={(text) => setPaymentDetails({ ...paymentDetails, bankName: text })}
            style={styles.input}
          />
        );
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
                onPress={handleCheckout}
                style={styles.checkoutButton}
              >
                Checkout
              </Button>
            </View>
          </Card.Content>
        </Card>
      )}

      <Portal>
        <Dialog visible={showCheckout} onDismiss={() => setShowCheckout(false)}>
          <Dialog.Title>Checkout</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView>
              <View style={styles.checkoutForm}>
                <TextInput
                  label="Full Name"
                  value={paymentDetails.name}
                  onChangeText={(text) => setPaymentDetails({ ...paymentDetails, name: text })}
                  style={styles.input}
                />
                <TextInput
                  label="Email"
                  value={paymentDetails.email}
                  onChangeText={(text) => setPaymentDetails({ ...paymentDetails, email: text })}
                  style={styles.input}
                />
                <TextInput
                  label="Phone"
                  value={paymentDetails.phone}
                  onChangeText={(text) => setPaymentDetails({ ...paymentDetails, phone: text })}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
                <TextInput
                  label="Delivery Address"
                  value={paymentDetails.address}
                  onChangeText={(text) => setPaymentDetails({ ...paymentDetails, address: text })}
                  style={styles.input}
                  multiline
                  numberOfLines={3}
                />
                
                <Title style={styles.paymentTitle}>Payment Method</Title>
                <RadioButton.Group onValueChange={value => setPaymentMethod(value as PaymentMethod)} value={paymentMethod}>
                  <View style={styles.radioItem}>
                    <RadioButton value="card" />
                    <Text>Credit/Debit Card</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="upi" />
                    <Text>UPI</Text>
                  </View>
                  <View style={styles.radioItem}>
                    <RadioButton value="netbanking" />
                    <Text>Net Banking</Text>
                  </View>
                </RadioButton.Group>

                {renderPaymentFields()}
              </View>
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={() => setShowCheckout(false)}>Cancel</Button>
            <Button mode="contained" onPress={handlePayment}>Pay Now</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  checkoutForm: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'transparent',
  },
  paymentTitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}); 