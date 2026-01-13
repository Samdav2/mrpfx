import re

def find_closing_div(filename, start_line):
    with open(filename, 'r') as f:
        lines = f.readlines()

    stack = 0
    found_start = False

    for i, line in enumerate(lines):
        if i + 1 < start_line:
            continue

        # Count open and close divs
        starts = len(re.findall(r'<div\b', line))
        ends = len(re.findall(r'</div>', line))

        if i + 1 == start_line:
            found_start = True
            # We assume the start line has the opening div we care about
            # But it might have multiple.
            # Line 768: <div class="elementor-element ...>
            # It has 1 open div.
            pass

        if found_start:
            stack += starts
            stack -= ends

            if stack == 0:
                print(f"Matching closing div found at line {i + 1}")
                return

find_closing_div('/home/rehack/mrp_frontend/components/home/ScrapedHomePage.tsx', 768)
