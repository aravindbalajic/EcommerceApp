import { Animated, Easing } from 'react-native';

export const fadeIn = (value: Animated.Value, duration: number = 1000) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    useNativeDriver: true,
  });
};

export const fadeOut = (value: Animated.Value, duration: number = 1000) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    useNativeDriver: true,
  });
};

export const slideUp = (value: Animated.Value, distance: number = 50, duration: number = 800) => {
  return Animated.timing(value, {
    toValue: 0,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
};

export const slideDown = (value: Animated.Value, distance: number = 50, duration: number = 800) => {
  return Animated.timing(value, {
    toValue: distance,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
};

export const scaleIn = (value: Animated.Value, duration: number = 800) => {
  return Animated.timing(value, {
    toValue: 1,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
};

export const scaleOut = (value: Animated.Value, duration: number = 800) => {
  return Animated.timing(value, {
    toValue: 0.9,
    duration,
    easing: Easing.out(Easing.ease),
    useNativeDriver: true,
  });
};

export const rotate = (value: Animated.Value, duration: number = 1000) => {
  return Animated.loop(
    Animated.timing(value, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: true,
    })
  );
};

export const bounce = (value: Animated.Value, duration: number = 1000) => {
  return Animated.loop(
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1.1,
        duration: duration / 2,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(value, {
        toValue: 1,
        duration: duration / 2,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ])
  );
}; 