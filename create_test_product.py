import asyncio
import json
import httpx
from decimal import Decimal

API_BASE = "http://127.0.0.1:8000/api/v1/wordpress/wc"

async def create_test_variable_product():
    async with httpx.AsyncClient() as client:
        # 1. Create the base variable product
        print("Creating base variable product...")
        product_data = {
            "name": "Variable Hoodie",
            "type": "variable",
            "regular_price": "50.00",
            "description": "A premium variable hoodie for testing.",
            "short_description": "Test variable product.",
            "status": "publish"
        }
        # Add attributes to the product
        product_data["attributes"] = [
            {
                "name": "Color",
                "options": ["Red", "Blue"],
                "variation": True,
                "visible": True
            },
            {
                "name": "Size",
                "options": ["M", "L"],
                "variation": True,
                "visible": True
            }
        ]

        resp = await client.post(f"{API_BASE}/products", json=product_data)
        if resp.status_code != 200:
            print(f"Failed to create product: {resp.text}")
            return

        product = resp.json()
        product_id = product["id"]
        print(f"Created product ID: {product_id}")

        # 2. Create variations
        variations = [
            {"sku": "HOOD-RED-M", "regular_price": "45.00", "attributes": [{"name": "Color", "option": "Red"}, {"name": "Size", "option": "M"}]},
            {"sku": "HOOD-RED-L", "regular_price": "50.00", "attributes": [{"name": "Color", "option": "Red"}, {"name": "Size", "option": "L"}]},
            {"sku": "HOOD-BLUE-M", "regular_price": "55.00", "attributes": [{"name": "Color", "option": "Blue"}, {"name": "Size", "option": "M"}]},
            {"sku": "HOOD-BLUE-L", "regular_price": "60.00", "attributes": [{"name": "Color", "option": "Blue"}, {"name": "Size", "option": "L"}]},
        ]

        for var_data in variations:
            print(f"Creating variation {var_data['sku']}...")
            vresp = await client.post(f"{API_BASE}/products/{product_id}/variations", json=var_data)
            if vresp.status_code != 200:
                print(f"Failed to create variation: {vresp.text}")

        print(f"Successfully created variable product: http://localhost:3000/product/variable-hoodie")

if __name__ == "__main__":
    asyncio.run(create_test_variable_product())
