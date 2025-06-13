# scripts/build_search_index.py

import glob, json
from bs4 import BeautifulSoup
docs = []

for filepath in glob.glob("*.html"):
    with open(filepath, "r", encoding="utf-8") as f:
        html = f.read()
    soup = BeautifulSoup(html, "html.parser")

    title = soup.title.string if soup.title else filepath
    # Extract all text under <body>
    body = soup.body.get_text(separator=" ", strip=True) if soup.body else ""
    content = " ".join(body.split())

    docs.append({"id": filepath, "title": title,  "content": content})

with open("assets/search_data.json", "w", encoding="utf-8") as f:
    json.dump(docs, f, indent=2, ensure_ascii=False)

print(f"Indexed {len(docs)} pages to assets/search_data.json")
