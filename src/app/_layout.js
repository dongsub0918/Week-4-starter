import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { TrailsProvider } from '../../data/TrailsContext';

export default function RootLayout() {
  return (
    <TrailsProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ animation: 'none', headerShown: false }} />
    </TrailsProvider>
  );
}
