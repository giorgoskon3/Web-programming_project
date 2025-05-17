import sqlite3
import pandas as pd

# 🔁 Τροποποίησε αυτά:
EXCEL_PATH = "data/ISCO-08.xlsx"  # π.χ. το αρχείο Excel με τους τύπους
DB_PATH = "data/sqlite-database.db"  # ή όποια βάση χρησιμοποιείς

# 📥 Ανάγνωση Excel
df = pd.read_excel(EXCEL_PATH)

# ✅ Υποθέτουμε ότι το αρχείο έχει τις στήλες:
# 'type_id', 'type_name', 'level', 'definition'
# Αν είναι αλλιώς, τροποποίησε τις γραμμές παρακάτω

# 🛢️ Σύνδεση στη βάση
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# Εισαγωγή κάθε γραμμής στον πίνακα TYPE
for _, row in df.iterrows():
    type_name = str(row['Title_EN'])
    level = int(row['Level']) if not pd.isna(row['Level']) else None
    definition = str(row['Definition'])

    cursor.execute("""
        INSERT INTO TYPE (type_name, level, definition)
        VALUES (?, ?, ?)
    """, (type_name, level, definition))

conn.commit()
cursor.close()
conn.close()
print("✅ Εισαγωγή ISCO τύπων ολοκληρώθηκε.")
