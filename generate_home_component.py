import os

def convert_to_jsx():
    with open('scraped_assets/content.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Basic replacements for JSX
    html_content = html_content.replace('class=', 'className=')
    html_content = html_content.replace('colspan=', 'colSpan=')
    html_content = html_content.replace('rowspan=', 'rowSpan=')
    html_content = html_content.replace('frameborder=', 'frameBorder=')
    html_content = html_content.replace('allowfullscreen', 'allowFullScreen')
    html_content = html_content.replace('autoplay', 'autoPlay')
    html_content = html_content.replace('<!--', '{/*').replace('-->', '*/}')

    # Self-closing tags
    tags = ['img', 'input', 'br', 'hr', 'link', 'meta']
    for tag in tags:
        html_content = html_content.replace(f'<{tag} ', f'<{tag} ') # This is hard to do perfectly with replace
        # A better way for simple scraping is to just use dangerouslySetInnerHTML for the body content
        # to avoid all the JSX syntax errors with unclosed tags, style objects, etc.

    # Given the complexity, dangerouslySetInnerHTML is safer for "pixel perfect" clone of messy HTML
    # But let's try to make it a component first.
    pass

def create_dangerously_set_component():
    with open('scraped_assets/content.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    # Escape backticks
    html_content = html_content.replace('`', '\\`')

    component_code = f"""
'use client';

const ScrapedHome = () => {{
  return (
    <div dangerouslySetInnerHTML={{{{ __html: `{html_content}` }}}} />
  );
}};

export default ScrapedHome;
"""

    os.makedirs('components/home', exist_ok=True)
    with open('components/home/ScrapedHome.tsx', 'w', encoding='utf-8') as f:
        f.write(component_code)
    print("Created components/home/ScrapedHome.tsx")

if __name__ == "__main__":
    create_dangerously_set_component()
