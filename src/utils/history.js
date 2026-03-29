export function createHistorySnapshot(activeShift) {
  return {
    ...activeShift,
    completedAt: Date.now(),
  };
}
