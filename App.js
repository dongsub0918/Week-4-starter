import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import ScreenLayout from './components/ScreenLayout';

export default function App() {
  return (
    <ScreenLayout>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </ScreenLayout>
  );
}