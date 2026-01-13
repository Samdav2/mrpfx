
from PIL import Image
import numpy as np
from collections import Counter

def analyze_image(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert('RGB')
        width, height = img.size
        pixels = np.array(img)

        # Analyze colors
        # We'll sample the bottom part of the image where buttons likely are
        # The image is likely the form.

        # Let's find the blue button color
        # We look for blue-ish pixels
        blue_pixels = []
        gray_pixels = []

        for row in pixels:
            for r, g, b in row:
                # Blue button heuristic: Blue component is dominant and high
                if b > r and b > g and b > 150:
                    blue_pixels.append((r, g, b))
                # Gray button heuristic: R, G, B are close and high (light gray)
                elif r > 200 and g > 200 and b > 200 and abs(r-g) < 10 and abs(g-b) < 10:
                    gray_pixels.append((r, g, b))

        most_common_blue = Counter(blue_pixels).most_common(1)
        most_common_gray = Counter(gray_pixels).most_common(1)

        print(f"Most common blue: {most_common_blue}")
        print(f"Most common gray: {most_common_gray}")

        if most_common_blue:
            r, g, b = most_common_blue[0][0]
            print(f"Blue Hex: #{r:02x}{g:02x}{b:02x}")

        if most_common_gray:
            r, g, b = most_common_gray[0][0]
            print(f"Gray Hex: #{r:02x}{g:02x}{b:02x}")

    except Exception as e:
        print(f"Error: {e}")

analyze_image('/home/rehack/.gemini/antigravity/brain/da9c6025-9646-44b8-908b-2b379302736b/uploaded_image_1768154878628.png')
