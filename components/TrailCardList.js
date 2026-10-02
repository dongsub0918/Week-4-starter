import { FlatList, StyleSheet, Text } from 'react-native';

import TrailCard from './TrailCard';

// Scrollable list of TrailCards shared by the Explore and Saved screens.
// `onTrailPress` is optional; cards are not pressable without it.
export default function TrailCardList({ trails, emptyMessage = 'No trails found.', onTrailPress }) {
  return (
    <FlatList
      data={trails}
      keyExtractor={(trail) => trail.id}
      renderItem={({ item }) => (
        <TrailCard trail={item} onPress={onTrailPress && (() => onTrailPress(item))} />
      )}
      ListEmptyComponent={<Text style={styles.emptyMessage}>{emptyMessage}</Text>}
      style={styles.list}
      contentContainerStyle={styles.listContent}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  listContent: {
    gap: 24,
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 24,
  },
  emptyMessage: {
    color: '#495057',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
  },
});
