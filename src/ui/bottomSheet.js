export function renderBottomSheet(content) {
  if (!content) return "";
  return `
    <div class="sheetOverlay" data-sheet-overlay></div>
    <div class="sheet">
      ${content}
    </div>
  `;
}
