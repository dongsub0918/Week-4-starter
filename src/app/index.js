import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenLayout from '../../components/ScreenLayout';
import ScreenTitle from '../../components/ScreenTitle';
import TrailSearchControls from '../../components/TrailSearchControls';
import IconNavigation from '../../components/navigation/IconNavigation';

// TEMPORARY PLACEHOLDER DATA:
// Replace this array with the shared trail data source when the TrailCard
// component is ready.
const temporaryTrails = [
  { id: '1', name: 'Pine Ridge Loop', miles: 2.4, hours: 1, difficulty: 'Easy' },
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
        <View style={styles.results}>
          {/* TEMPORARY PLACEHOLDER RESULTS:
              Replace this Text rendering with your partner's TrailCard component.
              Example: <TrailCard key={trail.id} trail={trail} /> */}
          {filteredTrails.map((trail) => (
            <Text key={trail.id} style={styles.trailText}>
              {trail.name} · {trail.miles} miles · {trail.hours} hours · {trail.difficulty}
            </Text>
          ))}
          {filteredTrails.length === 0 && <Text>No trails found.</Text>}
        </View>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    gap: 24,
  },
  fixedHeader: {
    gap: 24,
  },
  results: {
    gap: 12,
    paddingBottom: 24,
  },
  trailText: {
    color: '#212529',
  },
});
