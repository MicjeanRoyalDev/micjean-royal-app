import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { useColorScheme } from '~/hooks/useColorScheme';

const LoadingScreen = () => {
  const { themeColors } = useColorScheme();

  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (dot: Animated.Value) => {
      return Animated.sequence([
        Animated.timing(dot, {
          toValue: -15,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]);
    };

    const loop = Animated.loop(
      Animated.stagger(200, [animate(dot1), animate(dot2), animate(dot3)])
    );

    loop.start();

    return () => {
      loop.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View
      className="flex-1 justify-center items-center flex-row"
      style={{ backgroundColor: themeColors.background }}
    >
      <Animated.View
        className="w-3 h-6 rounded-md mx-2"
        style={{
          transform: [{ translateY: dot1 }],
          backgroundColor: themeColors.primary,
        }}
      />
      <Animated.View
        className="w-3 h-6 rounded-md mx-2"
        style={{
          transform: [{ translateY: dot2 }],
          backgroundColor: themeColors.primary,
        }}
      />
      <Animated.View
        className="w-3 h-6 rounded-md mx-2"
        style={{
          transform: [{ translateY: dot3 }],
          backgroundColor: themeColors.primary,
        }}
      />
    </View>
  );
};

export default LoadingScreen;