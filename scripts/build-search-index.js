// scripts/build-search-index.js
const fs     = require('fs');
const glob   = require('glob');
const cheerio = require('cheerio');

const docs = [];

glob.sync('*.html').forEach(file => {
  const html = fs.readFileSync(file, 'utf8');
  const $    = cheerio.load(html);

  // Grab page title (you could also use <title> or an <h1>/<h2>)
  const title = $('title').text() || file;
  // Grab all visible text
  const content = $('body').text().replace(/\s+/g, ' ').trim();

  docs.push({ id: file, title, content });
});

fs.writeFileSync('assets/search_data.json', JSON.stringify(docs, null,2));
console.log(`Indexed ${docs.length} pages to assets/search_data.json`);
