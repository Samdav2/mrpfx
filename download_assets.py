import os
import re
import requests
from urllib.parse import urljoin, urlparse
import hashlib

# Configuration
BASE_URL = "https://mrpfx.com/"
PROJECT_ROOT = "/home/rehack/mrp_frontend"
PUBLIC_DIR = os.path.join(PROJECT_ROOT, "public")
ASSETS_DIR = os.path.join(PUBLIC_DIR, "assets")
IMAGES_DIR = os.path.join(ASSETS_DIR, "images")
FONTS_DIR = os.path.join(ASSETS_DIR, "fonts")

# Files to process
CSS_FILE = os.path.join(PROJECT_ROOT, "app/scraped_styles.css")
COMPONENTS = [
    os.path.join(PROJECT_ROOT, "components/layout/Header.tsx"),
    os.path.join(PROJECT_ROOT, "components/layout/Footer.tsx"),
    os.path.join(PROJECT_ROOT, "components/home/ScrapedHome.tsx"),
    os.path.join(PROJECT_ROOT, "components/mentorship/MentorshipCourse.tsx"),
]

# Extensions
IMAGE_EXTS = ('.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico')
FONT_EXTS = ('.woff', '.woff2', '.ttf', '.eot', '.otf')

def get_local_path(url, content_type=None):
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    if not filename:
        # Generate filename from hash if none exists
        filename = hashlib.md5(url.encode()).hexdigest()

    # Clean filename
    filename = re.sub(r'[^a-zA-Z0-9._-]', '_', filename)

    # Determine directory based on extension
    ext = os.path.splitext(filename)[1].lower()

    # Handle cases where extension is missing or query params messed it up
    if not ext and content_type:
        if 'image' in content_type:
            ext = '.jpg' # Default fallback
            if 'png' in content_type: ext = '.png'
            elif 'svg' in content_type: ext = '.svg'
            elif 'webp' in content_type: ext = '.webp'
            elif 'gif' in content_type: ext = '.gif'
        filename += ext

    if ext in IMAGE_EXTS:
        return os.path.join(IMAGES_DIR, filename), f"/assets/images/{filename}"
    elif ext in FONT_EXTS:
        return os.path.join(FONTS_DIR, filename), f"/assets/fonts/{filename}"
    else:
        # Default to images if unknown, or skip?
        # Let's default to images for now as most are images
        return os.path.join(IMAGES_DIR, filename), f"/assets/images/{filename}"

def download_file(url):
    try:
        # Handle protocol-relative URLs
        if url.startswith('//'):
            url = 'https:' + url

        # Skip data URLs
        if url.startswith('data:'):
            return None, None

        # Resolve relative URLs
        if not url.startswith('http'):
            url = urljoin(BASE_URL, url)

        local_fs_path, public_path = get_local_path(url)

        if os.path.exists(local_fs_path):
            return local_fs_path, public_path

        print(f"Downloading: {url}")
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            # Update extension based on content-type if needed (not implemented for simplicity unless needed)
            with open(local_fs_path, 'wb') as f:
                f.write(response.content)
            return local_fs_path, public_path
        else:
            print(f"Failed to download {url}: Status {response.status_code}")
            return None, None
    except Exception as e:
        print(f"Error downloading {url}: {e}")
        return None, None

def process_css():
    print(f"Processing {CSS_FILE}...")
    with open(CSS_FILE, 'r') as f:
        content = f.read()

    # Regex for url(...)
    # Capture the URL inside
    url_pattern = re.compile(r'url\((?![\'"]?(?:data:))[\'"]?([^\'"\)]+)[\'"]?\)')

    def replace_match(match):
        url = match.group(1)
        # Remove quotes if captured
        url = url.strip("'\"")

        _, public_path = download_file(url)
        if public_path:
            return f'url("{public_path}")'
        return match.group(0)

    new_content = url_pattern.sub(replace_match, content)

    with open(CSS_FILE, 'w') as f:
        f.write(new_content)

def process_components():
    for file_path in COMPONENTS:
        if not os.path.exists(file_path):
            print(f"Skipping {file_path} (not found)")
            continue

        print(f"Processing {file_path}...")
        with open(file_path, 'r') as f:
            content = f.read()

        # Regex for src="..." or src='...'
        # We need to be careful not to match non-URL srcs, but usually src in these files is for images/scripts
        # We'll look for http/https or relative paths that look like assets

        # Pattern: src=["'](url)["']
        src_pattern = re.compile(r'src=["\'](https?://[^"\']+|/[^"\']+\.(?:png|jpg|jpeg|gif|svg|webp))["\']')

        # Also handle srcset? Maybe later.

        def replace_match(match):
            url = match.group(1)
            _, public_path = download_file(url)
            if public_path:
                return f'src="{public_path}"'
            return match.group(0)

        new_content = src_pattern.sub(replace_match, content)

        # Also look for style={{ backgroundImage: "url(...)" }} patterns in JSX?
        # Or just simple strings in the big HTML dump in ScrapedHome

        # For ScrapedHome, it has a big string. We can run the same regex as CSS but for the string content?
        # The CSS regex `url(...)` might match inside the HTML string too.

        # Let's try a generic URL finder for images in the content string if it's ScrapedHome
        if "ScrapedHome" in file_path:
             # Find all https://... images
             img_pattern = re.compile(r'(https?://[^"\']+\.(?:png|jpg|jpeg|gif|svg|webp))')
             def replace_img_url(match):
                 url = match.group(1)
                 _, public_path = download_file(url)
                 if public_path:
                     return public_path
                 return match.group(0)
             new_content = img_pattern.sub(replace_img_url, new_content)

        with open(file_path, 'w') as f:
            f.write(new_content)

if __name__ == "__main__":
    process_css()
    process_components()
