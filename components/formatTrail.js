// 2.25 -> "2h 15m"
export const formatDuration = (hours) => {
  const totalMinutes = Math.round(hours * 60);
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
};

// 3450 -> "3,450 ft"
export const formatElevation = (feet) => `${feet.toLocaleString('en-US')} ft`;
