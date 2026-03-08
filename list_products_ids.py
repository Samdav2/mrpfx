import asyncio
from lib.products import products_service

async def list_products():
    print("Fetching products...")
    try:
        products = await products_service.get_products(per_page=100)
        print(f"Found {len(products)} products:")
        for p in products:
            print(f"ID: {p.id} | Name: {p.name} | Price: {p.price} | Slug: {p.slug}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(list_products())
