from faker import Faker
import random
import sqlite3
from datetime import datetime, timedelta

# Ρυθμίσεις
db_path = "data/sqlite-database.db"
fake = Faker('el_GR')
conn = sqlite3.connect(db_path)
print("Successfully connected to database")
cursor = conn.cursor()

# Αριθμός εγγραφών
NUM_USERS = 10
NUM_COMPANIES = 5
NUM_JOBS = 15
NUM_JOB_SEEKERS = 5
NUM_EMPLOYERS = 5
NUM_SAVES = 10

# -----------------------------
# Εισαγωγή σε COMPANY
company_ids = []
for _ in range(NUM_COMPANIES):
    company_id = random.randint(1000, 9999)
    company_name = fake.company()
    company_ids.append(company_id)
    cursor.execute("INSERT INTO COMPANY (company_id, company_name) VALUES (?, ?)", (company_id, company_name))

# -----------------------------
# Εισαγωγή σε USER
user_ids = []
for _ in range(NUM_USERS):
    user_id = random.randint(1000, 9999)
    user_ids.append(user_id)
    email = fake.email()
    password = random.randint(100000, 999999)  # placeholder
    firstName = fake.first_name()
    lastName = fake.last_name()
    location = random.randint(1, 100)
    phone = random.randint(6900000000, 6999999999)
    cursor.execute("INSERT INTO USER (email, password, user_id, firstName, lastName, location, phone) VALUES (?, ?, ?, ?, ?, ?, ?)",
                   (email, password, user_id, firstName, lastName, location, phone))

# -----------------------------
# Διαχωρισμός σε JOB_SEEKERS και EMPLOYERS
job_seeker_ids = user_ids[:NUM_JOB_SEEKERS]
employer_ids = user_ids[-NUM_EMPLOYERS:]

for js_id in job_seeker_ids:
    cv = fake.text(max_nb_chars=100)
    cursor.execute("INSERT INTO JOB_SEEKER (CV, user_id) VALUES (?, ?)", (cv, js_id))

for emp_id in employer_ids:
    company_id = random.choice(company_ids)
    cursor.execute("INSERT INTO EMPLOYER (user_id, company_id) VALUES (?, ?)", (emp_id, company_id))

# -----------------------------
# Εισαγωγή σε JOB
job_ids = []
for _ in range(NUM_JOBS):
    job_id = random.randint(10000, 99999)
    job_ids.append(job_id)
    title = fake.job()
    work_style = random.choice(["Remote", "Hybrid", "On-site"])
    required_skills = ", ".join(fake.words(nb=3))
    benefits = ", ".join(fake.words(nb=2))
    location = fake.city()
    salary_range = random.randint(800, 3000)
    description = fake.text(max_nb_chars=200)
    type_id = random.choice(type_ids)
    status = random.choice(["active", "closed"])
    postDate = int((datetime.now() - timedelta(days=random.randint(0, 365))).timestamp())
    user_id = random.choice(employer_ids)
    company_id = random.choice(company_ids)
    cursor.execute("""
        INSERT INTO JOB (title, work_style, required_skills, benefits, location, salary_range, job_id,
                         description, type_id, status, postDate, user_id, company_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (title, work_style, required_skills, benefits, location, salary_range, job_id,
          description, type_id, status, postDate, user_id, company_id))

# -----------------------------
# Εισαγωγή σε saves
for _ in range(NUM_SAVES):
    requestDate = int((datetime.now() - timedelta(days=random.randint(0, 90))).timestamp())
    status = random.choice(["saved", "applied"])
    user_id = random.choice(job_seeker_ids)
    job_id = random.choice(job_ids)
    cursor.execute("INSERT INTO saves (requestDate, status, user_id, job_id) VALUES (?, ?, ?, ?)",
                   (requestDate, status, user_id, job_id))

conn.commit()
cursor.close()
conn.close()
