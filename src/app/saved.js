import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import ScreenLayout from '../../components/ScreenLayout';
import TrailSearchControls from '../../components/TrailSearchControls';
import IconNavigation from '../../components/navigation/IconNavigation';

// TEMPORARY PLACEHOLDER DATA:
// Replace this array with the stored starred/saved trails when that data is ready.
const temporarySavedTrails = [
  { id: '1', name: 'Pine Ridge Loop', miles: 2.4, hours: 1, difficulty: 'Easy' },
  { id: '2', name: 'Potawatomi Trail', miles: 5.2, hours: 2.5, difficulty: 'Moderate' },
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
          <Text style={styles.title}>Saved</Text>
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
          {filteredTrails.length === 0 && <Text>No saved trails found.</Text>}
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
  title: {
    paddingTop: 24,
    fontSize: 24,
    fontWeight: '700',
  },
});
