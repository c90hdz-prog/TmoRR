export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function formatDateLabel(ts) {
  return new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
