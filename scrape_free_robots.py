#!/usr/bin/env python3
"""
Scrape the Free Robots page from mrpfx.com and save all assets locally.
"""

import os
import re
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# Configuration
BASE_URL = "https://mrpfx.com/free-robots-indicators-seminars/"
OUTPUT_DIR = "scraped_assets/free_robots"
IMAGES_DIR = "public/assets/free_robots"
CSS_DIR = "app/free-robots-indicators-seminars"

# Headers to avoid blocking
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}

# Create directories
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(IMAGES_DIR, exist_ok=True)
os.makedirs(CSS_DIR, exist_ok=True)

def download_file(url, save_path):
    """Download a file from URL to save_path"""
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {save_path}")
        return True
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return False

def extract_image_urls(soup, base_url):
    """Extract all image URLs from the page"""
    image_urls = set()

    # From img tags
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
        if src:
            image_urls.add(urljoin(base_url, src))
        # Also check srcset
        srcset = img.get('srcset') or img.get('data-srcset')
        if srcset:
            for item in srcset.split(','):
                url = item.strip().split()[0]
                if url:
                    image_urls.add(urljoin(base_url, url))

    # From background images in style attributes
    for elem in soup.find_all(style=True):
        style = elem['style']
        urls = re.findall(r'url\(["\']?([^"\'()]+)["\']?\)', style)
        for url in urls:
            image_urls.add(urljoin(base_url, url))

    return image_urls

def extract_css_urls(soup, base_url):
    """Extract all CSS file URLs from the page"""
    css_urls = []
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href')
        if href:
            css_urls.append(urljoin(base_url, href))
    return css_urls

def clean_html(soup):
    """Clean up the HTML - remove scripts, comments, invisible classes"""

    # Remove script tags
    for script in soup.find_all('script'):
        script.decompose()

    # Remove noscript tags
    for noscript in soup.find_all('noscript'):
        noscript.decompose()

    # Remove style tags (we'll use external CSS)
    for style in soup.find_all('style'):
        style.decompose()

    # Remove link tags (stylesheet references to external)
    for link in soup.find_all('link'):
        link.decompose()

    # Remove 'elementor-invisible' class from all elements
    for elem in soup.find_all(class_='elementor-invisible'):
        elem['class'] = [c for c in elem.get('class', []) if c != 'elementor-invisible']

    # Remove HTML comments
    for comment in soup.find_all(string=lambda text: isinstance(text, str) and text.strip().startswith('<!--')):
        comment.extract()

    return soup

def get_url_filename(url):
    """Get filename from URL"""
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    return filename if filename else 'unknown'

def main():
    print(f"Fetching page from {BASE_URL}...")

    # Fetch the page
    response = requests.get(BASE_URL, headers=HEADERS, timeout=30)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')

    # Save raw HTML first
    with open(os.path.join(OUTPUT_DIR, 'raw.html'), 'w', encoding='utf-8') as f:
        f.write(response.text)
    print(f"Saved raw HTML to {OUTPUT_DIR}/raw.html")

    # Extract and download images
    print("\nExtracting images...")
    image_urls = extract_image_urls(soup, BASE_URL)
    image_map = {}  # Map original URL to local path

    for url in image_urls:
        if 'mrpfx.com' in url and '/wp-content/' in url:
            filename = get_url_filename(url)
            # Clean up filename
            filename = re.sub(r'[^\w\-_.]', '_', filename)
            local_path = os.path.join(IMAGES_DIR, filename)

            if download_file(url, local_path):
                # Create mapping for URL replacement
                image_map[url] = f"/assets/free_robots/{filename}"

    # Extract CSS URLs (for reference)
    print("\nCSS files found:")
    css_urls = extract_css_urls(soup, BASE_URL)
    for css_url in css_urls:
        print(f"  - {css_url}")

    # Download main CSS files (Elementor and Theme)
    css_to_download = [
        ("https://mrpfx.com/wp-content/plugins/elementor/assets/css/frontend.min.css", "elementor.css"),
        ("https://mrpfx.com/wp-content/themes/developer/style.css", "theme.css"),
        ("https://mrpfx.com/wp-content/uploads/elementor/css/post-42921.css", "post-42921.css") # This might be specific to home, need to check if this page has a specific post css
    ]

    # Try to find the specific post CSS for this page
    for css_url in css_urls:
        if 'post-' in css_url and 'elementor/css' in css_url:
             filename = get_url_filename(css_url)
             css_to_download.append((css_url, filename))

    for css_url, local_name in css_to_download:
        try:
            css_response = requests.get(css_url, headers=HEADERS, timeout=30)
            css_response.raise_for_status()
            css_path = os.path.join(CSS_DIR, local_name)
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(css_response.text)
            print(f"Downloaded CSS: {css_path}")
        except Exception as e:
            print(f"Could not download CSS {css_url}: {e}")

    # Clean up HTML
    print("\nCleaning HTML...")
    main_content = soup.find('main') or soup.find('div', {'data-elementor-type': 'wp-page'}) or soup.find('body')

    if main_content:
        clean_html(main_content)

        # Replace image URLs with local paths
        html_content = str(main_content)
        for original_url, local_path in image_map.items():
            html_content = html_content.replace(original_url, local_path)

        # Save cleaned HTML
        cleaned_path = os.path.join(OUTPUT_DIR, 'cleaned.html')
        with open(cleaned_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f"Saved cleaned HTML to {cleaned_path}")

        # Generate React component
        component_content = f'''\'use client\';

import Newsletter from '@/components/home/Newsletter';

const ScrapedFreeRobotsPage = () => {{
  return (
    <div className="free-robots-page">
      <div
        dangerouslySetInnerHTML={{{{ __html: `{html_content.replace('`', '\\`').replace('${', '\\${')}` }}}}
      />
      <Newsletter />
    </div>
  );
}};

export default ScrapedFreeRobotsPage;
'''
        component_path = 'components/free_robots/ScrapedFreeRobotsPage.tsx'
        os.makedirs(os.path.dirname(component_path), exist_ok=True)
        with open(component_path, 'w', encoding='utf-8') as f:
            f.write(component_content)
        print(f"Generated React component: {component_path}")

    print("\n✅ Free Robots page scraping complete!")

if __name__ == "__main__":
    main()
