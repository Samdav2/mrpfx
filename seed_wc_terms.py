import sqlite3
import os

DB_PATH = "/home/rehack/PycharmProjects/mrpfx-backend/mrpfx.db"

def seed_wc_terms():
    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    terms = [
        ('simple', 'simple'),
        ('variable', 'variable'),
        ('grouped', 'grouped'),
        ('external', 'external'),
        ('exclude-from-search', 'exclude-from-search'),
        ('exclude-from-catalog', 'exclude-from-catalog'),
        ('featured', 'featured'),
        ('outofstock', 'outofstock')
    ]

    print("Checking and seeding terms...")
    for name, slug in terms:
        # Check if term exists
        cursor.execute("SELECT term_id FROM '8jH_terms' WHERE slug = ?", (slug,))
        row = cursor.fetchone()

        if not row:
            print(f"Adding term: {name}")
            cursor.execute("INSERT INTO '8jH_terms' (name, slug, term_group) VALUES (?, ?, ?)", (name, slug, 0))
            term_id = cursor.lastrowid
        else:
            term_id = row[0]
            print(f"Term already exists: {slug} (ID: {term_id})")

        # Check if taxonomy entry exists
        taxonomy = 'product_type' if slug in ['simple', 'variable', 'grouped', 'external'] else 'product_visibility'
        cursor.execute("SELECT term_taxonomy_id FROM '8jH_term_taxonomy' WHERE term_id = ? AND taxonomy = ?", (term_id, taxonomy))
        tax_row = cursor.fetchone()

        if not tax_row:
            print(f"Adding taxonomy entry for {slug} in {taxonomy}")
            cursor.execute("INSERT INTO '8jH_term_taxonomy' (term_id, taxonomy, description, parent, count) VALUES (?, ?, ?, ?, ?)", (term_id, taxonomy, '', 0, 0))

    conn.commit()
    conn.close()
    print("Seeding complete.")

if __name__ == "__main__":
    seed_wc_terms()
