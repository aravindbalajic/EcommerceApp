import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Image, View, Linking, Dimensions, Animated, TextStyle } from 'react-native';
import { Surface, Text, Title, Card, Button, Portal, Dialog, IconButton } from 'react-native-paper';
import { colors, typography, spacing, shadows, borders, commonStyles } from '../styles/theme';
import { fadeIn, slideUp, scaleIn, bounce } from '../styles/animations';

const steelImages = [
  { id: 1, image: { uri: 'https://via.placeholder.com/300x200?text=Steel+Rods' }, title: 'Steel Rods' },
  { id: 2, image: { uri: 'https://via.placeholder.com/300x200?text=Steel+Sheets' }, title: 'Steel Sheets' },
  { id: 3, image: { uri: 'https://via.placeholder.com/300x200?text=Steel+Pipes' }, title: 'Steel Pipes' },
  { id: 4, image: { uri: 'https://via.placeholder.com/300x200?text=Steel+Beams' }, title: 'Steel Beams' },
  { id: 5, image: { uri: 'https://via.placeholder.com/300x200?text=Steel+Scrap' }, title: 'Steel Scrap' },
  { id: 6, image: { uri: 'https://via.placeholder.com/300x200?text=Steel+Coils' }, title: 'Steel Coils' }
];

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      fadeIn(fadeAnim),
      slideUp(slideAnim),
      scaleIn(scaleAnim),
    ]).start();

    bounce(bounceAnim).start();
  }, []);

  const handleCall = () => {
    Linking.openURL('tel:9444992199');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:arm@gmail.com');
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View 
        style={[
          styles.header,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Title style={styles.title}>ARM Steel Agency</Title>
        <Text style={styles.subtitle}>Quality Steel Products Since 1995</Text>
      </Animated.View>

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Title style={styles.sectionTitle}>Our Products</Title>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.imageScroll}
            contentContainerStyle={styles.imageScrollContent}
          >
            {steelImages.map((item, index) => (
              <Animated.View
                key={item.id}
                style={[
                  styles.imageCardContainer,
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateX: slideAnim },
                      { scale: scaleAnim }
                    ]
                  }
                ]}
              >
                <Card style={styles.imageCard}>
                  <Card.Cover source={item.image} style={styles.image} />
                  <Card.Content style={styles.imageContent}>
                    <Title style={styles.imageTitle}>{item.title}</Title>
                  </Card.Content>
                </Card>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View
          style={[
            styles.infoContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Card style={styles.infoCard}>
            <Card.Content>
              <Title style={styles.infoTitle}>About Us</Title>
              <Text style={styles.infoText}>
                ARM Steel Agency is a leading supplier of high-quality steel products in India. 
                With over 25 years of experience in the steel industry, we have built a reputation 
                for reliability, quality, and customer satisfaction. Our commitment to excellence 
                has made us a trusted partner for construction companies, manufacturers, and 
                industrial clients across the country.
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.infoCard}>
            <Card.Content>
              <Title style={styles.infoTitle}>Our Vision</Title>
              <Text style={styles.infoText}>
                To be the most trusted and preferred steel supplier in India, known for our 
                unwavering commitment to quality, innovation, and customer service. We aim to 
                contribute to the nation's infrastructure development by providing superior 
                steel products that meet international standards.
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.infoCard}>
            <Card.Content>
              <Title style={styles.infoTitle}>Our Mission</Title>
              <Text style={styles.infoText}>
                To provide high-quality steel products at competitive prices while maintaining 
                the highest standards of customer service. We are committed to:
                {"\n\n"}• Delivering superior quality steel products
                {"\n"}• Ensuring timely delivery and service
                {"\n"}• Maintaining ethical business practices
                {"\n"}• Supporting sustainable development
                {"\n"}• Building long-term relationships with our clients
              </Text>
            </Card.Content>
          </Card>
        </Animated.View>

        <Animated.View
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: bounceAnim }
              ]
            }
          ]}
        >
          <Button 
            mode="contained" 
            style={styles.contactButton}
            onPress={() => setVisible(true)}
          >
            Contact Us
          </Button>
        </Animated.View>
      </View>

      <Portal>
        <Dialog 
          visible={visible} 
          onDismiss={() => setVisible(false)}
          style={styles.dialog}
        >
          <Dialog.Title style={styles.dialogTitle}>Contact Details</Dialog.Title>
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

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  header: {
    padding: spacing.xl,
    backgroundColor: colors.primary,
    borderBottomLeftRadius: borders.radius.xl,
    borderBottomRightRadius: borders.radius.xl,
    ...shadows.large,
  },
  title: {
    ...typography.h1,
    color: colors.background,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,
  subtitle: {
    ...typography.caption,
    color: colors.background,
    marginTop: spacing.xs,
  } as TextStyle,
  content: {
    padding: spacing.lg,
  },
  sectionContainer: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.lg,
  } as TextStyle,
  imageScroll: {
    marginBottom: spacing.lg,
  },
  imageScrollContent: {
    paddingRight: spacing.lg,
  },
  imageCardContainer: {
    marginRight: spacing.lg,
  },
  imageCard: {
    width: 300,
    borderRadius: borders.radius.lg,
    overflow: 'hidden',
    ...shadows.medium,
  },
  image: {
    height: 200,
  },
  imageContent: {
    padding: spacing.md,
    backgroundColor: colors.background,
  },
  imageTitle: {
    ...typography.h3,
    textAlign: 'center',
    color: colors.primary,
  } as TextStyle,
  infoContainer: {
    marginBottom: spacing.xl,
  },
  infoCard: {
    marginBottom: spacing.lg,
    borderRadius: borders.radius.lg,
    backgroundColor: colors.background,
    ...shadows.medium,
  },
  infoTitle: {
    ...typography.h2,
    color: colors.primary,
    marginBottom: spacing.md,
  } as TextStyle,
  infoText: {
    ...typography.body,
    color: colors.text,
  } as TextStyle,
  buttonContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  contactButton: {
    ...commonStyles.button,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  dialog: {
    borderRadius: borders.radius.lg,
    ...shadows.large,
  },
  dialogTitle: {
    ...typography.h2,
    color: colors.primary,
  } as TextStyle,
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  contactLabel: {
    ...typography.body,
    fontWeight: 'bold' as const,
    width: 80,
  } as TextStyle,
  contactValue: {
    flex: 1,
  },
}); 