import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import ScreenLayout from '../../components/ScreenLayout';
import ScreenTitle from '../../components/ScreenTitle';
import TrailSearchControls from '../../components/TrailSearchControls';
import TrailCardList from '../../components/TrailCardList';
import IconNavigation from '../../components/navigation/IconNavigation';
import { useTrailFilter, useTrails } from '../../data/TrailsContext';

export default function SavedPage() {
  const { trails, isLoading, toggleSaved } = useTrails();
  const savedTrails = useMemo(() => trails.filter((trail) => trail.isSaved), [trails]);
  const {
    filteredTrails,
    searchQuery,
    setSearchQuery,
    selectedDifficulty,
    setSelectedDifficulty,
  } = useTrailFilter(savedTrails);

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
        <TrailCardList
          trails={filteredTrails}
          isLoading={isLoading}
          emptyMessage="No saved trails found."
          onToggleSaved={toggleSaved}
        />
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
