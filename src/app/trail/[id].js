import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Path, Svg } from 'react-native-svg';

import ScreenLayout from '../../../components/ScreenLayout';
import TrailDetailFooter from '../../../components/navigation/TrailDetailFooter';
import { useTrails } from '../../../data/TrailsContext';

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M12 19L5 12L12 5"
        stroke="#FFF"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

// Return to whichever list opened this trail; fall back to Explore when the
// page was opened directly (e.g. via a deep link) with nothing to go back to.
function goBack() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace('/');
  }
}

export default function TrailDetailPage() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { getTrailById, isLoading } = useTrails();
  const trail = getTrailById(id);

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
            accessibilityLabel="Go back"
            onPress={goBack}
            style={styles.backButton}
          >
            <BackIcon />
          </Pressable>
        </View>
        <View style={styles.detailContent}>
          {/* TEMPORARY: full detail layout comes in the next step. */}
          {isLoading && <ActivityIndicator color="#066B4C" />}
          {!isLoading && !trail && <Text>Trail not found.</Text>}
          {trail && <Text>{trail.name}</Text>}
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
