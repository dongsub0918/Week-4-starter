import { StyleSheet, Text, View } from 'react-native';

const DIFFICULTY_COLORS = {
  Easy: '#3B8C4F',
  Moderate: '#F9A800',
  Hard: '#E8173C',
};

export default function DifficultyBadge({ difficulty }) {
  return (
    <View style={[styles.badge, { backgroundColor: DIFFICULTY_COLORS[difficulty] }]}>
      <Text style={styles.label}>{difficulty}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    height: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    borderRadius: 16,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
  },
});
