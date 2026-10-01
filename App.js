// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// import ProfileScreen from './src/profileScreen'; 

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Open up App.js to start working on your app!</Text>
// //       <StatusBar style="auto" />
// //     </View>
// //   );
// // }

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <ProfileScreen />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Polygon } from 'react-native-svg';

import ProfileScreen from './src/profileScreen'; 

const color = {
  brand: '#1E6B3C',
  inactive: '#555B61',
  border: '#E3E6E4',
  bg: '#FFFFFF',
  text: '#1A1A1A',
};

/* ---------------- Tab icons (24pt outline, matching the wireframe) ---------------- */

const iconProps = (tint) => ({
  fill: 'none',
  stroke: tint,
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
});

function MountainIcon({ color: tint, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="m8 3 4 8 5-5 5 15H2L8 3z" {...iconProps(tint)} />
    </Svg>
  );
}

function StarIcon({ color: tint, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        {...iconProps(tint)}
      />
    </Svg>
  );
}

function UserIcon({ color: tint, size = 24 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" {...iconProps(tint)} />
      <Circle cx="12" cy="7" r="4" {...iconProps(tint)} />
    </Svg>
  );
}

/* ---------------- Placeholder screens until Explore / Saved are built ---------------- */

function PlaceholderScreen({ title }) {
  return (
    <SafeAreaView edges={['top']} style={styles.placeholder}>
      <Text style={styles.placeholderText}>{title}</Text>
    </SafeAreaView>
  );
}

const ExploreScreen = () => <PlaceholderScreen title="Explore" />;
const SavedScreen = () => <PlaceholderScreen title="Saved" />;

/* ---------------- Navigator ---------------- */

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Tab.Navigator
          initialRouteName="Profile"
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: color.brand,
            tabBarInactiveTintColor: color.inactive,
            tabBarLabelStyle: { fontSize: 13, lineHeight: 16, fontWeight: '500' },
            tabBarStyle: {
              backgroundColor: color.bg,
              borderTopColor: color.border,
              borderTopWidth: StyleSheet.hairlineWidth,
            },
          }}
        >
          <Tab.Screen
            name="Explore"
            component={ExploreScreen}
            options={{ tabBarIcon: ({ color: tint }) => <MountainIcon color={tint} /> }}
          />
          <Tab.Screen
            name="Saved"
            component={SavedScreen}
            options={{ tabBarIcon: ({ color: tint }) => <StarIcon color={tint} /> }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ tabBarIcon: ({ color: tint }) => <UserIcon color={tint} /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.bg,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: color.text,
  },
});