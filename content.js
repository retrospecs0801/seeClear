// This script will be injected into the page when popup.js triggers
function applyFilter(matrix) {
  document.body.style.filter = matrix;
}

function resetFilter() {
  document.body.style.filter = "none";
}

// Expose functions to window so popup.js can call them
window.applyColorBlindFilter = applyFilter;
window.resetColorBlindFilter = resetFilter;
