import { StyleSheet, View } from 'react-native';

import ScreenLayout from '../../components/ScreenLayout';
import ScreenTitle from '../../components/ScreenTitle';
import TrailSearchControls from '../../components/TrailSearchControls';
import TrailCardList from '../../components/TrailCardList';
import IconNavigation from '../../components/navigation/IconNavigation';
import { useTrailFilter, useTrails } from '../../data/TrailsContext';

export default function HomePage() {
  const { trails, isLoading, toggleSaved } = useTrails();
  const {
    filteredTrails,
    searchQuery,
    setSearchQuery,
    selectedDifficulty,
    setSelectedDifficulty,
  } = useTrailFilter(trails);

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
        <TrailCardList
          trails={filteredTrails}
          isLoading={isLoading}
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
