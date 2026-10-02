import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import DifficultyBadge from './DifficultyBadge';
import StarIcon from './StarIcon';
import { formatDuration } from './formatTrail';

const IMAGE_SIZE = 120;

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
        <DifficultyBadge difficulty={difficulty} />
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
  meta: {
    color: '#495057',
    fontSize: 16,
    lineHeight: 24,
  },
  starButton: {
    alignSelf: 'center',
  },
});
