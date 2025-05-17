import sqlite3

conn = sqlite3.connect("data/sqlite-database.db")
cursor = conn.cursor()

# Διαγραφή όλων των εγγραφών
cursor.execute("DELETE FROM JOB")

# Reset auto-increment ID
cursor.execute("DELETE FROM sqlite_sequence WHERE name='JOB'")

conn.commit()
cursor.close()
conn.close()

print("✅ Τα δεδομένα διαγράφηκαν από τον πίνακα JOB.")
