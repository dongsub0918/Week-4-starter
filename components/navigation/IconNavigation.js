import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { router, usePathname } from 'expo-router';

import AppIcon from './AppIcon';
import { navigationStyles } from './navigationStyles';

const destinations = [
  { label: 'Explore', path: '/', icon: 'mountain' },
  { label: 'Saved', path: '/saved', icon: 'save' },
  { label: 'Profile', path: '/profile', icon: 'profile' },
];
const AnimatedText = Animated.createAnimatedComponent(Text);

function NavigationItem({ destination, active }) {
  const progress = useRef(new Animated.Value(active ? 1 : 0)).current;
  const labelColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#495057', '#066B4C'],
  });
  useEffect(() => {
    Animated.timing(progress, {
      toValue: active ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [active, progress]);

  const color = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['#495057', '#066B4C'],
  });

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={destination.label}
      accessibilityState={{ selected: active }}
      style={navigationStyles.navigationButton}
      onPress={() => router.replace(destination.path)}
    >
      <AppIcon name={destination.icon} color={color} />
      <AnimatedText style={[navigationStyles.label, { color: labelColor }]}>
        {destination.label}
      </AnimatedText>
    </Pressable>
  );
}

export default function IconNavigation() {
  const pathname = usePathname();

  return (
    <View style={navigationStyles.footer}>
      <View style={navigationStyles.iconRow}>
        {destinations.map((destination) => (
          <NavigationItem
            key={destination.path}
            destination={destination}
            active={pathname === destination.path}
          />
        ))}
      </View>
    </View>
  );
}
