import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

BASE_URL = "https://mrpfx.com/"
OUTPUT_DIR = "scraped_assets"

def scrape_site():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    print(f"Fetching {BASE_URL}...")
    response = requests.get(BASE_URL, headers=headers)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract Header
    header = soup.find('header')
    if header:
        print("Found header")
        with open(os.path.join(OUTPUT_DIR, 'header.html'), 'w', encoding='utf-8') as f:
            f.write(str(header))
    else:
        print("Header not found!")

    # Extract Footer
    footer = soup.find('footer')
    if footer:
        print("Found footer")
        with open(os.path.join(OUTPUT_DIR, 'footer.html'), 'w', encoding='utf-8') as f:
            f.write(str(footer))
    else:
        print("Footer not found!")

    # Extract Main Content
    # Try to find the main content area. It might be <main> or a specific div.
    # Looking at previous analysis, it might be a series of sections.
    # Let's try to capture everything between header and footer.

    # Strategy: Remove header and footer, then save the body content
    body_content = soup.find('body')
    if body_content:
        # Create a copy to modify
        import copy
        content_soup = copy.copy(body_content)

        if content_soup.find('header'):
            content_soup.find('header').decompose()
        if content_soup.find('footer'):
            content_soup.find('footer').decompose()

        # Also remove scripts and iframes to clean up
        for script in content_soup(["script", "noscript", "iframe"]):
            script.decompose()

        print("Found content")
        with open(os.path.join(OUTPUT_DIR, 'content.html'), 'w', encoding='utf-8') as f:
            # Write the inner HTML of the body
            f.write(content_soup.decode_contents())
    else:
        print("Body not found!")

    # Download CSS
    css_links = [link['href'] for link in soup.find_all('link', rel='stylesheet') if 'href' in link.attrs]

    combined_css = ""
    for link in css_links:
        css_url = urljoin(BASE_URL, link)
        try:
            print(f"Downloading CSS: {css_url}")
            css_resp = requests.get(css_url, headers=headers)
            if css_resp.status_code == 200:
                combined_css += f"/* Source: {css_url} */\n"
                combined_css += css_resp.text + "\n\n"
        except Exception as e:
            print(f"Failed to download {css_url}: {e}")

    with open(os.path.join(OUTPUT_DIR, 'scraped_styles.css'), 'w', encoding='utf-8') as f:
        f.write(combined_css)

    print("Scraping complete!")

if __name__ == "__main__":
    scrape_site()
