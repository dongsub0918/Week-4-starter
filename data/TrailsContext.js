import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { fetchTrails } from './trailsApi';

const TrailsContext = createContext(null);

// Single source of trail data for the whole app. Fetches once on mount and
// keeps any changes (e.g. saving a trail) in memory only.
export function TrailsProvider({ children }) {
  const [trails, setTrails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchTrails().then((fetchedTrails) => {
      if (isMounted) {
        setTrails(fetchedTrails);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleSaved = useCallback((trailId) => {
    setTrails((current) =>
      current.map((trail) => (trail.id === trailId ? { ...trail, isSaved: !trail.isSaved } : trail)),
    );
  }, []);

  const getTrailById = useCallback(
    (trailId) => trails.find((trail) => trail.id === trailId),
    [trails],
  );

  const value = useMemo(
    () => ({ trails, isLoading, toggleSaved, getTrailById }),
    [trails, isLoading, toggleSaved, getTrailById],
  );

  return <TrailsContext.Provider value={value}>{children}</TrailsContext.Provider>;
}

export function useTrails() {
  const context = useContext(TrailsContext);

  if (!context) {
    throw new Error('useTrails must be used inside a TrailsProvider');
  }

  return context;
}

// Search + difficulty filter state shared by the Explore and Saved screens.
export function useTrailFilter(trails) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredTrails = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return trails.filter((trail) => {
      const matchesSearch = trail.name.toLowerCase().includes(normalizedQuery);
      const matchesDifficulty =
        selectedDifficulty === 'All' || trail.difficulty === selectedDifficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [trails, searchQuery, selectedDifficulty]);

  return {
    filteredTrails,
    searchQuery,
    setSearchQuery,
    selectedDifficulty,
    setSelectedDifficulty,
  };
}
