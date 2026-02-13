import requests
import json
import time

BASE_URL = "http://127.0.0.1:8000/api/v1"
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "password123"

def print_response(resp):
    try:
        print(json.dumps(resp.json(), indent=2))
    except:
        print(resp.text)

def verify_admin_api():
    print("Starting Admin API Verification...")

    # 1. Admin Login
    print("\n1. Testing Admin Login...")
    login_data = {
        "login": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    }
    resp = requests.post(f"{BASE_URL}/auth/admin/login", json=login_data)
    if resp.status_code != 200:
        print(f"Login failed: {resp.status_code}")
        print_response(resp)
        # Try to create admin user if login fails (might not exist)
        print("Attempting to create admin user...")
        # Note: We can't easily create an admin user via API if we are not admin.
        # But let's assume the user exists or we can use the previous script logic if needed.
        # For now, let's just proceed and see.
        return

    token_data = resp.json()
    access_token = token_data.get("access_token")
    print("Login successful. Token received.")

    headers = {"Authorization": f"Bearer {access_token}"}

    # 2. List Users
    print("\n2. Testing List Users...")
    resp = requests.get(f"{BASE_URL}/wordpress/users/", headers=headers, params={"page": 1, "per_page": 5})
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        users = resp.json()
        print(f"Found {len(users)} users.")
        if len(users) > 0:
            print(f"First user: {users[0].get('user_email')}")
    else:
        print_response(resp)

    # 3. List Orders
    print("\n3. Testing List Orders...")
    resp = requests.get(f"{BASE_URL}/wordpress/wc/orders/", headers=headers, params={"status": "any", "limit": 5, "offset": 0})
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        orders = resp.json()
        print(f"Found {len(orders)} orders.")
    else:
        print_response(resp)

    # 4. List Courses
    print("\n4. Testing List Courses...")
    resp = requests.get(f"{BASE_URL}/wordpress/learnpress/courses", headers=headers, params={"skip": 0, "limit": 5})
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        courses = resp.json()
        print(f"Found {len(courses)} courses.")
    else:
        print_response(resp)

    # 5. Get Member (Specific ID test if possible, otherwise skip list)
    print("\n5. Testing Get Member (ID 1)...")
    resp = requests.get(f"{BASE_URL}/wordpress/members/1", headers=headers)
    print(f"Status: {resp.status_code}")
    # We expect 404 if not found, or 200 if exists.
    # Just checking if endpoint is reachable and auth works.

if __name__ == "__main__":
    verify_admin_api()
