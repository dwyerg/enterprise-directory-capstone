import csv
import random
from datetime import datetime, timedelta
import json
import names

NUM_ROWS = 1000
OUTPUT_FILE = "employees.csv"

data_rows = []
for i in range(1, NUM_ROWS + 1):

    id = i

    first = names.get_first_name()
    last = names.get_last_name()
    name = first + ' ' + last

    first_part = random.randint(100, 999)
    second_part = random.randint(100, 999)
    third_part = random.randint(1000, 9999)
    phone = f'{first_part}-{second_part}-{third_part}'

    roles = ['Human Resources', 'Finance Liason', 'Software Engineer', 'Scrum Master', 'Product Manager', 'Sales Associate', 'Data Engineer', 'Data Scientist']
    role = random.choice(roles)

    locations = ['Remote', 'St Paul', 'Hartford', 'New York', 'Boston']
    location = random.choice(locations)

    raw_salary = random.randint(30000, 150000)
    salary = round(raw_salary, -3)

    if id == 1:
        manager_id = None
    elif id in range(2, 11):
        manager_id = 1
    else:
        manager_id = random.randint(2, 11)

    data_row = [
        id,
        name,
        phone,
        role,
        location,
        salary,
        manager_id
    ]

    data_rows.append(data_row)

with open(OUTPUT_FILE, "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(
        [
        'id',
        'name',
        'phone',
        'role',
        'location',
        'salary',
        'manager_id'
    ]
    )
    writer.writerows(data_rows)

print("Data generation complete.")
