import os
import re
from bs4 import BeautifulSoup, Comment, NavigableString

def create_dangerously_set_component():
    try:
        with open('scraped_assets/mentorship_content.html', 'r', encoding='utf-8') as f:
            html_content = f.read()
    except FileNotFoundError:
        print("Error: scraped_assets/mentorship_content.html not found. Please scrape the page first.")
        return

    soup = BeautifulSoup(html_content, 'html.parser')

    # Remove header with id="masthead"
    header = soup.find('header', id='masthead')
    if header:
        header.decompose()
        print("Removed header (id='masthead')")

    # Remove footer with id="colophon"
    footer = soup.find('footer', id='colophon')
    if footer:
        footer.decompose()
        print("Removed footer (id='colophon')")

    # Remove all HTML comments
    for comment in soup.find_all(string=lambda text: isinstance(text, Comment)):
        comment.extract()
    print("Removed all HTML comments")

    # Remove all script tags (they don't work in React and cause issues)
    for script in soup.find_all('script'):
        script.decompose()
    print("Removed all script tags")

    # Remove all link tags (CSS links - we have our own styles)
    for link in soup.find_all('link', rel='stylesheet'):
        link.decompose()
    print("Removed stylesheet link tags")

    # Remove noscript tags (GTM etc)
    for noscript in soup.find_all('noscript'):
        noscript.decompose()
    print("Removed noscript tags")

    # Remove style tags in head (inline styles that might conflict)
    for style in soup.find_all('style'):
        style.decompose()
    print("Removed inline style tags")

    # Remove 'elementor-invisible' class from all elements - this makes content visible
    for elem in soup.find_all(class_='elementor-invisible'):
        classes = elem.get('class', [])
        classes = [c for c in classes if c != 'elementor-invisible']
        elem['class'] = classes
    print("Removed 'elementor-invisible' class from all elements")

    # Extract body content to avoid nesting <html> and <body> tags
    if soup.body:
        final_html = "".join([str(x) for x in soup.body.contents])
    else:
        final_html = str(soup)

    # Clean up leftover comment-like text patterns
    patterns_to_remove = [
        r'GTM Container placement set to automatic',
        r'Google Tag Manager \(noscript\)',
        r'End Google Tag Manager \(noscript\)',
        r'Start of Tawk\.to Script[^<]*',
        r'End of Tawk\.to Script[^<]*',
        r'#page',
    ]
    for pattern in patterns_to_remove:
        final_html = re.sub(pattern, '', final_html, flags=re.IGNORECASE)
    print("Cleaned up leftover comment text")

    # Escape backticks to prevent syntax errors in the template string
    final_html = final_html.replace('`', '\\`')

    # Escape ${} to prevent template literal interpolation attempts
    final_html = final_html.replace('${', '\\${')

    component_code = f"""'use client';

const MentorshipCourse = () => {{
  return (
    <div className="mentorship-page" dangerouslySetInnerHTML={{{{ __html: `{final_html}` }}}} />
  );
}};

export default MentorshipCourse;
"""

    os.makedirs('components/mentorship', exist_ok=True)
    with open('components/mentorship/MentorshipCourse.tsx', 'w', encoding='utf-8') as f:
        f.write(component_code)
    print("Created components/mentorship/MentorshipCourse.tsx")

if __name__ == "__main__":
    create_dangerously_set_component()
