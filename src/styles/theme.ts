import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#1B3C73',
  secondary: '#2C5282',
  accent: '#4299E1',
  background: '#FFFFFF',
  surface: '#F7FAFC',
  text: '#2D3748',
  textLight: '#718096',
  error: '#E53E3E',
  success: '#38A169',
  warning: '#DD6B20',
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: colors.text,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text,
  },
  h3: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    color: colors.textLight,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const shadows = StyleSheet.create({
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});

export const borders = {
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    round: 9999,
  },
  width: {
    thin: 1,
    medium: 2,
    thick: 3,
  },
};

export const animations = {
  duration: {
    fast: 200,
    normal: 400,
    slow: 600,
  },
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
};

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.md,
    padding: spacing.md,
    ...shadows.medium,
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borders.radius.round,
    backgroundColor: colors.primary,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borders.radius.md,
    padding: spacing.sm,
    ...shadows.small,
  },
  text: {
    ...typography.body,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.h3,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
}); 