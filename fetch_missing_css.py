import requests
import os

CSS_URLS = [
    'https://mrpfx.com/wp-content/uploads/elementor/css/post-7232.css',
    'https://mrpfx.com/wp-content/uploads/elementor/css/post-42519.css',
    'https://mrpfx.com/wp-content/uploads/elementor/css/post-42539.css',
    'https://mrpfx.com/wp-content/plugins/ultimate-member/assets/css/um-styles.min.css',
    'https://mrpfx.com/wp-content/plugins/ultimate-member/assets/css/um-old-default.min.css'
]

OUTPUT_DIR = 'scraped_assets/indicators/missing_css'
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}

def fetch_css():
    for url in CSS_URLS:
        filename = os.path.basename(url)
        print(f"Fetching {filename}...")
        try:
            response = requests.get(url, headers=HEADERS)
            response.raise_for_status()
            with open(os.path.join(OUTPUT_DIR, filename), 'w', encoding='utf-8') as f:
                f.write(response.text)
            print(f"Saved {filename}")
        except Exception as e:
            print(f"Failed to fetch {url}: {e}")

if __name__ == '__main__':
    fetch_css()
