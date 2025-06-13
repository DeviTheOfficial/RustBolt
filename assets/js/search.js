// assets/js/search.js

let idx, documents = [];

// Load the JSON index and build Lunr index
fetch('assets/search_data.json')
  .then(r => r.json())
  .then(data => {
    documents = data;
    idx = lunr(function(){
      this.ref('id');
      this.field('title');
      this.field('content');
      data.forEach(doc => this.add(doc), this);
    });
  })
  .catch(console.error);

function doSearch(){
  const q = document.getElementById('searchText').value.trim();
  if(!q || !idx) return false;

  const results = idx.search(q);
  const list    = document.getElementById('results-list');
  list.innerHTML = '';

  if(results.length){
    results.forEach(r => {
      const doc = documents.find(d => d.id === r.ref);
      const li  = document.createElement('li');
      li.innerHTML = `
        <a href="${doc.id}">
          <strong>${doc.title}</strong><br>
          <small>${doc.id}</small>
        </a>`;
      list.appendChild(li);
    });
  } else {
    list.innerHTML = `<li>No matches for “${q}”</li>`;
  }

  document.getElementById('search-results').classList.remove('d-none');
  return false;  // Prevent actual form submit
}

function closeResults(){
  document.getElementById('search-results').classList.add('d-none');
}
