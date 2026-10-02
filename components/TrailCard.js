import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Polygon, Svg } from 'react-native-svg';

const DIFFICULTY_COLORS = {
  Easy: '#3B8C4F',
  Moderate: '#F9A800',
  Hard: '#D64535',
};

const STAR_COLOR = '#F9A800';
const IMAGE_SIZE = 120;

// 2.25 -> "2h 15m"
const formatDuration = (hours) => {
  const totalMinutes = Math.round(hours * 60);
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
};

function StarIcon({ filled }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24">
      <Polygon
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
        fill={filled ? STAR_COLOR : 'none'}
        stroke={filled ? STAR_COLOR : '#495057'}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default function TrailCard({ trail, onPress, onToggleSaved }) {
  const { name, miles, hours, difficulty, imageUrl, isSaved = false } = trail;
  const duration = formatDuration(hours);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name}, ${difficulty}, ${miles} miles, ${duration}`}
      disabled={!onPress}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} accessibilityIgnoresInvertColors />
      ) : (
        <View style={styles.image} />
      )}

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={[styles.badge, { backgroundColor: DIFFICULTY_COLORS[difficulty] }]}>
          <Text style={styles.badgeLabel}>{difficulty}</Text>
        </View>
        <Text style={styles.meta}>
          {miles} mi • {duration}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isSaved ? `Remove ${name} from saved` : `Save ${name}`}
        accessibilityState={{ selected: isSaved }}
        disabled={!onToggleSaved}
        hitSlop={12}
        onPress={onToggleSaved}
        style={styles.starButton}
      >
        <StarIcon filled={isSaved} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 24,
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
  cardPressed: {
    backgroundColor: '#F2F4F3',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 8,
    backgroundColor: '#000',
  },
  details: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 8,
  },
  name: {
    color: '#000',
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 28,
  },
  badge: {
    height: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    borderRadius: 16,
  },
  badgeLabel: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
  meta: {
    color: '#495057',
    fontSize: 16,
    lineHeight: 24,
  },
  starButton: {
    alignSelf: 'center',
  },
});
