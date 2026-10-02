import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import SearchIcon from './SearchIcon';

const FILTERS = ['All', 'Easy', 'Moderate', 'Hard'];
const FILTER_WIDTHS = { All: 0.75, Easy: 0.95, Moderate: 1.45, Hard: 0.95 };

export default function TrailSearchControls({
  searchQuery,
  onSearchQueryChange,
  selectedDifficulty,
  onDifficultyChange,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchIcon />
        <TextInput
          accessibilityLabel="Search trails"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          onChangeText={onSearchQueryChange}
          placeholder="Search trails"
          placeholderTextColor="#6C757D"
          returnKeyType="search"
          style={styles.searchInput}
          underlineColorAndroid="transparent"
          value={searchQuery}
        />
      </View>

      <View style={styles.filterRow}>
        {FILTERS.map((filter) => {
          const selected = selectedDifficulty === filter;

          return (
            <Pressable
              key={filter}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              onPress={() => onDifficultyChange(filter)}
              style={[
                styles.filterButton,
                { flex: FILTER_WIDTHS[filter] },
                selected && styles.selectedFilterButton,
              ]}
            >
              <Text style={[styles.filterLabel, selected && styles.selectedFilterLabel]}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 24,
  },
  searchBar: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 16,
    paddingRight: 8,
    gap: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    alignSelf: 'stretch',
    padding: 0,
    color: '#212529',
  },
  filterRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterButton: {
    height: 32,
    minWidth: 0,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(226, 226, 226, 0.89)',
    backgroundColor: '#FFF',
  },
  selectedFilterButton: {
    borderColor: '#076843',
    backgroundColor: '#076843',
  },
  filterLabel: {
    color: '#495057',
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 24,
  },
  selectedFilterLabel: {
    color: '#FFF',
  },
});
