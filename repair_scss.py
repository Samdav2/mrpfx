
import re

file_path = 'app/_scraped_styles.scss'

with open(file_path, 'r') as f:
    content = f.read()

# 1. Restore corrupted alphanumeric-& combinations (like comment-&, t&, etc)
# This finds any '&' that is preceded by a letter, number, or hyphen
content = re.sub(r'([a-zA-Z0-9\-])&', r'\1body', content)

# 2. Fix the standalone body and html selectors properly
# We want to replace 'body' and 'html' with '&' ONLY when they are likely selectors.
# In minified CSS, selectors often appear after '{', '}', ',', or at start of file.
# We also handle 'body:hover', 'body.class', etc.

def replace_selector(match):
    prefix = match.group(1)
    tag = match.group(2)
    suffix = match.group(3)
    return prefix + '&' + suffix

# Pattern: (Start of file or selector separator) (tag) (Selector termination or modifier)
# Separators: , { }
# Modifiers: . : [ # space , {
tag_pattern = r'(^|[,{}])(body|html)([\s,.#:{]|(?=[]])|$)'

content = re.sub(tag_pattern, replace_selector, content)

with open(file_path, 'w') as f:
    f.write(content)

print("Repair and selective replacement complete.")
