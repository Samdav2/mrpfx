import re

def analyze_structure(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()

    stack = []
    target_line = 768

    for i, line in enumerate(lines):
        if i + 1 >= target_line:
            break

        # Find all start tags <div ...>
        starts = [m.start() for m in re.finditer(r'<div\b', line)]
        # Find all end tags </div>
        ends = [m.start() for m in re.finditer(r'</div>', line)]

        # We need to process them in order of appearance
        events = []
        for pos in starts:
            events.append((pos, 'open', line))
        for pos in ends:
            events.append((pos, 'close', line))

        events.sort(key=lambda x: x[0])

        for _, type, content in events:
            if type == 'open':
                # Extract class or id for identification
                tag_content = content[pos:]
                match = re.search(r'class="([^"]*)"', tag_content)
                cls = match.group(1) if match else "unknown"
                stack.append(cls)
            elif type == 'close':
                if stack:
                    stack.pop()

    print("Open tags stack:")
    for cls in stack:
        print(cls)

analyze_structure('/home/rehack/mrp_frontend/components/home/ScrapedHomePage.tsx')
