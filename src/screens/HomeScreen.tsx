import React, { useState } from 'react';
import { ScrollView, StyleSheet, Image, View, Linking } from 'react-native';
import { Surface, Text, Title, Card, Button, Portal, Dialog, IconButton } from 'react-native-paper';

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);

  const handleCall = () => {
    Linking.openURL('tel:9444992199');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:arm@gmail.com');
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Title style={styles.title}>ARM Steel Agency</Title>
        <Text style={styles.subtitle}>Quality Steel Products Since 1995</Text>
      </Surface>

      <View style={styles.content}>
        <Card style={styles.aboutCard}>
          <Card.Content>
            <Title>About Us</Title>
            <Text style={styles.aboutText}>
              ARM Steel Agency is a leading supplier of high-quality steel products. 
              With over 25 years of experience, we provide premium steel solutions 
              for construction, manufacturing, and industrial applications.
            </Text>
          </Card.Content>
        </Card>

        <Title style={styles.sectionTitle}>Our Services</Title>
        <View style={styles.servicesContainer}>
          {services.map((service, index) => (
            <Card key={index} style={styles.serviceCard}>
              <Card.Content>
                <Title>{service.title}</Title>
                <Text>{service.description}</Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Button 
          mode="contained" 
          style={styles.contactButton}
          onPress={() => setVisible(true)}
        >
          Contact Us
        </Button>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Contact Details</Dialog.Title>
          <Dialog.Content>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Button 
                mode="text" 
                onPress={handleEmail}
                style={styles.contactValue}
              >
                arm@gmail.com
              </Button>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactLabel}>Phone:</Text>
              <Button 
                mode="text" 
                onPress={handleCall}
                style={styles.contactValue}
              >
                +91 9444992199
              </Button>
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
}

const services = [
  {
    title: "Custom Steel Solutions",
    description: "Tailored steel products meeting your exact specifications"
  },
  {
    title: "Wholesale Supply",
    description: "Bulk orders with competitive pricing for businesses"
  },
  {
    title: "Expert Consultation",
    description: "Professional guidance for your steel requirements"
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    elevation: 4,
    backgroundColor: '#1B3C73',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  aboutCard: {
    marginVertical: 16,
  },
  aboutText: {
    marginTop: 8,
    lineHeight: 24,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  servicesContainer: {
    gap: 16,
  },
  serviceCard: {
    marginBottom: 16,
  },
  contactButton: {
    marginTop: 16,
    backgroundColor: '#1B3C73',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  contactLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 80,
  },
  contactValue: {
    flex: 1,
  }
}); 