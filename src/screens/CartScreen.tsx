import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Card, Title, Paragraph, Button, Text, TextInput, Portal, Dialog, RadioButton } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { colors, typography, spacing, shadows, borders } from '../styles/theme';

type PaymentMethod = 'card' | 'upi' | 'netbanking';

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart, addOrder } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: string }>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id!]: '1' }), {})
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [showQRCode, setShowQRCode] = useState(false);
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
    if (paymentMethod === 'upi') {
      setShowQRCode(true);
      return;
    }

    // Create order from cart items
    const order = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      items: cartItems.map(item => ({
        name: item.name,
        quantity: quantities[item.id!],
        price: item.price
      })),
      total: total,
      status: 'Processing' as const
    };

    // Add order to history
    addOrder(order);
    
    // Clear cart
    clearCart();
    
    // Reset quantities
    setQuantities({});
    
    // Close checkout dialog
    setShowCheckout(false);
    
    // Show success message
    alert('Order placed successfully!');
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
          <View style={styles.upiContainer}>
            <Text style={styles.upiText}>Scan QR Code to pay ₹{total.toFixed(2)}</Text>
            <Text style={styles.upiText}>UPI ID: arm.steel@okaxis</Text>
            <Button
              mode="contained"
              onPress={() => setShowQRCode(true)}
              style={styles.showQRButton}
            >
              Show QR Code
            </Button>
          </View>
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

        <Dialog visible={showQRCode} onDismiss={() => setShowQRCode(false)}>
          <Dialog.Title>Scan QR Code</Dialog.Title>
          <Dialog.Content>
            <View style={styles.qrContainer}>
              <Image
                source={require('../assets/upi-qr.jpg')}
                style={styles.qrCode}
                resizeMode="contain"
              />
              <Text style={styles.qrText}>Amount: ₹{total.toFixed(2)}</Text>
              <Text style={styles.qrText}>UPI ID: arm.steel@okaxis</Text>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              setShowQRCode(false);
              setShowCheckout(false);
              clearCart();
              alert('Thank you for your payment! Your order has been placed.');
            }}>Payment Complete</Button>
            <Button onPress={() => setShowQRCode(false)}>Close</Button>
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
  upiContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  upiText: {
    ...typography.body,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  showQRButton: {
    marginTop: spacing.md,
    backgroundColor: colors.primary,
  },
  qrContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: spacing.md,
  },
  qrText: {
    ...typography.body,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
}); 