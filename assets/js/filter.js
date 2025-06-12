// /assets/js/filter.js

document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.querySelector('#asset-search input');
  const tabs = document.querySelectorAll('#assetsTab .nav-link');
  let activeTab = document.querySelector('#assetsTab .nav-link.active');

  // Function to filter assets based on search term and active tab
  function filterAssets() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activePane = document.querySelector(activeTab.getAttribute('href'));
    const assets = activePane.querySelectorAll('.asset-item');

    assets.forEach(asset => {
      const title = asset.dataset.title.toLowerCase();
      const description = asset.dataset.description.toLowerCase();
      const matches = title.includes(searchTerm) || description.includes(searchTerm);

      if (matches) {
        asset.classList.remove('d-none');
      } else {
        asset.classList.add('d-none');
      }
    });
  }

  // --- Event Listeners ---

  // 1. Filter when user types in the search bar
  if (searchInput) {
    searchInput.addEventListener('input', filterAssets);
  }

  // 2. Re-filter when a new tab is shown and clear search
  tabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', function (event) {
      activeTab = event.target; // Update active tab
      searchInput.value = ''; // Clear search input on tab change
      filterAssets(); // Run filter to show all items in the new tab
    });
  });

  // Initial call in case of page refresh on a sub-tab
  filterAssets();
});