import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Card, Title, Text, List, Divider, Button } from 'react-native-paper';

// Mock user data (replace with real data later)
const user = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  address: "123 Steel Street, Chennai, Tamil Nadu"
};

// Mock order history (replace with real data later)
const orderHistory = [
  {
    id: "ORD001",
    date: "2024-03-15",
    items: [
      { name: "Steel I-Beam", quantity: 2, price: "599.99" },
      { name: "Steel Pipe", quantity: 3, price: "299.99" }
    ],
    total: 1799.95,
    status: "Delivered"
  },
  {
    id: "ORD002",
    date: "2024-03-10",
    items: [
      { name: "Steel Sheet", quantity: 1, price: "199.99" }
    ],
    total: 199.99,
    status: "Processing"
  }
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* User Profile Card */}
      <Card style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <Avatar.Text 
            size={80} 
            label={user.name.split(' ').map(n => n[0]).join('')} 
            style={styles.avatar}
          />
          <Title style={styles.name}>{user.name}</Title>
        </View>
        <Card.Content>
          <List.Item
            title="Email"
            description={user.email}
            left={props => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            title="Phone"
            description={user.phone}
            left={props => <List.Icon {...props} icon="phone" />}
          />
          <List.Item
            title="Address"
            description={user.address}
            left={props => <List.Icon {...props} icon="home" />}
          />
          <Button 
            mode="outlined" 
            onPress={() => {/* Add edit profile handler */}}
            style={styles.editButton}
          >
            Edit Profile
          </Button>
        </Card.Content>
      </Card>

      {/* Order History */}
      <Card style={styles.orderCard}>
        <Card.Content>
          <Title>Order History</Title>
          {orderHistory.map((order, index) => (
            <View key={order.id}>
              <List.Accordion
                title={`Order #${order.id}`}
                description={`Date: ${order.date}`}
                left={props => <List.Icon {...props} icon="package" />}
              >
                <View style={styles.orderDetails}>
                  {order.items.map((item, idx) => (
                    <View key={idx} style={styles.orderItem}>
                      <Text>{item.name} x{item.quantity}</Text>
                      <Text>${item.price}</Text>
                    </View>
                  ))}
                  <Divider style={styles.divider} />
                  <View style={styles.orderFooter}>
                    <Text style={styles.total}>Total: ${order.total}</Text>
                    <Text style={[
                      styles.status,
                      { color: order.status === 'Delivered' ? '#4CAF50' : '#FFC107' }
                    ]}>
                      {order.status}
                    </Text>
                  </View>
                </View>
              </List.Accordion>
              {index < orderHistory.length - 1 && <Divider />}
            </View>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileCard: {
    margin: 16,
    elevation: 4,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    backgroundColor: '#1B3C73',
  },
  name: {
    marginTop: 10,
    fontSize: 24,
  },
  editButton: {
    marginTop: 16,
    borderColor: '#1B3C73',
  },
  orderCard: {
    margin: 16,
    marginTop: 0,
    elevation: 4,
  },
  orderDetails: {
    padding: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  divider: {
    marginVertical: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  total: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    fontWeight: 'bold',
  }
}); 