import requests
import json

try:
    response = requests.get('http://127.0.0.1:8000/openapi.json')
    data = response.json()
    print("Paths found:")
    for path in data.get('paths', {}):
        print(path)
except Exception as e:
    print(f"Error: {e}")
