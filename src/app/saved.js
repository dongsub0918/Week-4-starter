import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ScreenLayout from '../../components/ScreenLayout';
import ScreenTitle from '../../components/ScreenTitle';
import TrailSearchControls from '../../components/TrailSearchControls';
import TrailCardList from '../../components/TrailCardList';
import IconNavigation from '../../components/navigation/IconNavigation';

// TEMPORARY PLACEHOLDER DATA:
// Replace this array with the stored starred/saved trails when that data is ready.
const temporarySavedTrails = [
  { id: '1', name: 'Pine Ridge Loop', miles: 2.4, hours: 1, difficulty: 'Easy', isSaved: true },
  { id: '2', name: 'Potawatomi Trail', miles: 5.2, hours: 2.5, difficulty: 'Moderate', isSaved: true },
];

export default function SavedPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredTrails = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return temporarySavedTrails.filter((trail) => {
      const matchesSearch = trail.name.toLowerCase().includes(normalizedQuery);
      const matchesDifficulty =
        selectedDifficulty === 'All' || trail.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [searchQuery, selectedDifficulty]);

  return (
    <ScreenLayout footer={<IconNavigation />}>
      <View style={styles.content}>
        <View style={styles.fixedHeader}>
          <ScreenTitle>Saved</ScreenTitle>
          <TrailSearchControls
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />
        </View>
        <TrailCardList trails={filteredTrails} emptyMessage="No saved trails found." />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    gap: 24,
  },
  // The list pads itself so card shadows aren't clipped at the gutter.
  fixedHeader: {
    paddingHorizontal: 24,
    gap: 24,
  },
});
