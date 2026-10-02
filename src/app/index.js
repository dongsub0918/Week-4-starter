import { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import ScreenLayout from '../../components/ScreenLayout';
import ScreenTitle from '../../components/ScreenTitle';
import TrailSearchControls from '../../components/TrailSearchControls';
import TrailCardList from '../../components/TrailCardList';
import IconNavigation from '../../components/navigation/IconNavigation';

// TEMPORARY PLACEHOLDER DATA:
// Replace this array with the shared trail data source when the TrailCard
// component is ready.
const temporaryTrails = [
  { id: '1', name: 'Pine Ridge Loop', miles: 2.4, hours: 1, difficulty: 'Easy', isSaved: true },
  { id: '2', name: 'Potawatomi Trail', miles: 5.2, hours: 2.5, difficulty: 'Moderate' },
  { id: '3', name: 'Brighton Ridge Trail', miles: 8.1, hours: 4, difficulty: 'Hard' },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredTrails = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return temporaryTrails.filter((trail) => {
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
          <ScreenTitle>TrailMate</ScreenTitle>
          <TrailSearchControls
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            selectedDifficulty={selectedDifficulty}
            onDifficultyChange={setSelectedDifficulty}
          />
        </View>
        <TrailCardList trails={filteredTrails} />
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
