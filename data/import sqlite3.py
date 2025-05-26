import pandas as pd
import sqlite3

# Βήμα 1: Φόρτωσε το Excel αρχείο
excel_file = 'ISCO-08.xlsx'  # <-- Άλλαξε το όνομα με το δικό σου
df = pd.read_excel(excel_file)

# Αναμένουμε στήλες: 'type_name', 'level', 'definition'
required_columns = {'Title_EN', 'Level', 'Definition'}
if not required_columns.issubset(df.columns):
    raise ValueError(f"Το Excel αρχείο πρέπει να περιέχει τις στήλες: {required_columns}")

# Βήμα 2: Σύνδεση με SQLite βάση
conn = sqlite3.connect('data/sqlite-database.db')  # <-- Άλλαξε το path αν χρειάζεται
cursor = conn.cursor()

# Βήμα 3: Εισαγωγή δεδομένων στη βάση
for _, row in df.iterrows():
    cursor.execute('''
        INSERT INTO TYPE (type_name, level, definition)
        VALUES (?, ?, ?)
    ''', (row['Title_EN'], row['Level'], row['Definition']))
    
# Βήμα 4: Αποθήκευση και κλείσιμο
conn.commit()
conn.close()

print("✅ Τα δεδομένα προστέθηκαν επιτυχώς στον πίνακα TYPE.")
