import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';

import ScreenLayout from '../../components/ScreenLayout';
import TrailDetailFooter from '../../components/navigation/TrailDetailFooter';

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 9H16.5C18.9853 9 21 11.0147 21 13.5C21 15.9853 18.9853 18 16.5 18H12M7 13L3 9L7 5"
        stroke="#FFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function TrailDetailPage() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenLayout edgeToEdge footer={<TrailDetailFooter />}>
      <StatusBar style="light" />
      <View style={styles.page}>
        <View
          style={[
            styles.header,
            { height: HEADER_HEIGHT + insets.top, paddingTop: 24 + insets.top },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back to homepage"
            onPress={() => router.replace('/')}
            style={styles.backButton}
          >
            <BackIcon />
          </Pressable>
        </View>
        <View style={styles.detailContent}>
          <Text>Trail Detail</Text>
        </View>
      </View>
    </ScreenLayout>
  );
}

// Header height below the status bar; the top inset is added at render time.
const HEADER_HEIGHT = 136;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: '100%',
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#000',
  },
  backButton: {
    width: 40,
    height: 40,
    padding: 8,
    alignItems: 'flex-start',
    gap: 10,
    flexShrink: 0,
    borderRadius: 40,
    backgroundColor: '#6E828F',
  },
  detailContent: {
    flex: 1,
    padding: 24,
  },
});
