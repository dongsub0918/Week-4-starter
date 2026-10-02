import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Circle, Path, Svg } from 'react-native-svg';

import DifficultyBadge from '../../../components/DifficultyBadge';
import ScreenLayout from '../../../components/ScreenLayout';
import StarIcon from '../../../components/StarIcon';
import { formatDuration, formatElevation } from '../../../components/formatTrail';
import TrailDetailFooter from '../../../components/navigation/TrailDetailFooter';
import { useTrails } from '../../../data/TrailsContext';

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

const statIconProps = {
  fill: 'none',
  stroke: '#495057',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function MapPinIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" {...statIconProps} />
      <Circle cx="12" cy="10" r="3" {...statIconProps} />
    </Svg>
  );
}

function MountainIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path d="m8 3 4 8 5-5 5 15H2L8 3z" {...statIconProps} />
    </Svg>
  );
}

function ClockIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Circle cx="12" cy="12" r="10" {...statIconProps} />
      <Path d="M12 6v6l4 2" {...statIconProps} />
    </Svg>
  );
}

function Stat({ icon, value, label }) {
  return (
    <View style={styles.stat}>
      <View style={styles.statValueRow}>
        {icon}
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
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

function TrailDetails({ trail }) {
  const { name, difficulty, miles, hours, elevationGainFt, description, location } = trail;

  return (
    <ScrollView contentContainerStyle={styles.detailContent} showsVerticalScrollIndicator={false}>
      <View style={styles.titleRow}>
        <Text style={styles.name} accessibilityRole="header">
          {name}
        </Text>
        <DifficultyBadge difficulty={difficulty} />
      </View>

      <View style={styles.divider} />

      <View style={styles.statsRow}>
        <Stat icon={<MapPinIcon />} value={`${miles} mi`} label="Distance" />
        <View style={styles.statDivider} />
        <Stat icon={<MountainIcon />} value={formatElevation(elevationGainFt)} label="Elevation" />
        <View style={styles.statDivider} />
        <Stat icon={<ClockIcon />} value={formatDuration(hours)} label="Time" />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle} accessibilityRole="header">
          Description
        </Text>
        <Text style={styles.bodyText}>{description}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.bodyText}>The trailhead is at {location}.</Text>
        {/* TEMPORARY: map preview placeholder until a map is wired up. */}
        <View style={styles.mapCard}>
          <View style={styles.mapPlaceholder} accessibilityLabel="Trail map preview" />
        </View>
      </View>
    </ScrollView>
  );
}

export default function TrailDetailPage() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const { getTrailById, isLoading, toggleSaved } = useTrails();
  const trail = getTrailById(id);

  return (
    <ScreenLayout edgeToEdge footer={<TrailDetailFooter />}>
      <StatusBar style="light" />
      <View style={styles.page}>
        <ImageBackground
          source={trail?.imageUrl ? { uri: trail.imageUrl } : undefined}
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
          {trail && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={trail.isSaved ? `Remove ${trail.name} from saved` : `Save ${trail.name}`}
              accessibilityState={{ selected: trail.isSaved }}
              onPress={() => toggleSaved(trail.id)}
              style={styles.saveButton}
            >
              <StarIcon filled={trail.isSaved} color="#212529" />
            </Pressable>
          )}
        </ImageBackground>

        {trail ? (
          <TrailDetails trail={trail} />
        ) : (
          <View style={styles.status}>
            {isLoading ? (
              <ActivityIndicator color="#066B4C" />
            ) : (
              <Text style={styles.bodyText}>Trail not found.</Text>
            )}
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
  saveButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    backgroundColor: '#FFF',
  },
  status: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailContent: {
    padding: 24,
    gap: 24,
  },
  titleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 24,
  },
  name: {
    flexShrink: 1,
    color: '#000',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 40,
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    color: '#495057',
    fontSize: 16,
    lineHeight: 24,
  },
  statLabel: {
    color: '#495057',
    fontSize: 14,
    lineHeight: 20,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E2E2',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  bodyText: {
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
  },
  mapCard: {
    marginTop: 8,
    padding: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  mapPlaceholder: {
    height: 104,
    borderRadius: 8,
    backgroundColor: '#333',
  },
});
