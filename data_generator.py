import json
from faker import Faker
import random
from datetime import datetime, timedelta

fake = Faker()

job_postings = []

for _ in range(100):
    job_posting = {
        "job_title": fake.job(),
        "company_name": fake.company(),
        "location": fake.city() + ", " + fake.state(),
        "job_type": random.choice(["Full-time", "Part-time", "Contract"]),
        "posted_date": (datetime.now() - timedelta(days=random.randint(1, 30))).strftime("%Y-%m-%d"),
        "description": fake.text()
    }
    job_postings.append(job_posting)

with open("data.json", "w") as file:
    json.dump(job_postings, file, indent=2)

print("JSON file created successfully: data.json")
