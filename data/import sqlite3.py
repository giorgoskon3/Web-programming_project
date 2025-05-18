import sqlite3

# Σύνδεση στη βάση
conn = sqlite3.connect('data/sqlite-database.db')  # ή το όνομα της βάσης σου
cursor = conn.cursor()

# Εισαγωγή των 100 έτοιμων εγγραφών
type_data = [
    ('Full-Time', 1, 1, 'Nearly experience young daughter east air nothing likely book respond company.'),
    ('Part-Time', 2, 3, 'Present miss respond left television career.'),
    ('Internship', 3, 1, 'Cold fire company including low reach she.'),
    ('Contract', 4, 2, 'Behavior manager occur operation hope himself cup.'),
    ('Freelance', 5, 3, 'Quickly continue appear ten sound wall worker something instead.'),
    ('Temporary', 6, 1, 'Tell training work rate technology store work today than always collection.'),
    ('Volunteer', 7, 3, 'Participant likely agent hospital evening development professional heart great defense.'),
    ('Seasonal', 8, 3, 'Time wear project TV goal fact anything point.'),
    ('Remote', 9, 3, 'Generation important every notice brother likely direction.'),
    ('Hybrid', 10, 2, 'Several thousand drug many wonder.'),
]

cursor.execute("DELETE FROM TYPE")
# Εκτέλεση πολλαπλών INSERT
cursor.executemany(
    "INSERT INTO TYPE (type_name, type_id, level, definition) VALUES (?, ?, ?, ?)",
    type_data
)

# Commit και κλείσιμο
conn.commit()
conn.close()

print("Οι εγγραφές προστέθηκαν επιτυχώς.")
