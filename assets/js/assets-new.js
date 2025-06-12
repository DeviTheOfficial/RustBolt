// /assets/js/assets-new.js

document.addEventListener('DOMContentLoaded', function () {
  // The search input is now in our new sidebar box
  const searchInput = document.querySelector('#asset-search-form input');

  function filterAssets() {
    // Find the active tab every time the function runs
    const activeTab = document.querySelector('#assetsTab .nav-link.active');
    if (!activeTab) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const activePaneId = activeTab.getAttribute('href');
    const activePane = document.querySelector(activePaneId);
    if (!activePane) return;

    // Get all asset items within the active tab's content pane
    const assets = activePane.querySelectorAll('.asset-item');

    // Loop through assets and show/hide them based on the search
    assets.forEach(asset => {
      const title = asset.dataset.title.toLowerCase();
      const matches = title.includes(searchTerm);

      if (matches) {
        asset.classList.remove('d-none');
      } else {
        asset.classList.add('d-none');
      }
    });
  }

  // --- Event Listeners ---

  // Run the filter when the user types in the search bar
  if (searchInput) {
    searchInput.addEventListener('input', filterAssets);
  }

  // When a new tab is shown, clear the search and re-filter
  const allTabs = document.querySelectorAll('#assetsTab .nav-link');
  allTabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function () {
      if(searchInput) {
        searchInput.value = '';
      }
      filterAssets();
    });
  });
  
  // Run once on page load to set the initial state
  filterAssets();
});