# MongoDB – Hospital Scheduling & Billing
A compact NoSQL proof‑of‑concept that models patient scheduling, doctor availability, and billing workflows for a mid‑size hospital.

---

## Business scenario
**Goals**
1. Track appointments and their status.
2. Record billing information per appointment.
3. Maintain a staff directory of doctors.
4. Store patient demographics and contact details.

MongoDB’s document model lets the schema evolve without complex joins while still supporting rich aggregation pipelines.

---

## Tech stack
| Tool / Version | Purpose |
|----------------|---------|
| **MongoDB 6.0** | Primary database |
| **MongoDB Compass** | Visual import & ad‑hoc queries |
| **Node.js 18 + Mongo Shell (mongosh)** | Runs the playground script |
| **VS Code** (MongoDB extension) | Editing `.js` files |
| **Python (Colab)** | Generates synthetic CSVs |

---

## Collections & key fields
| Collection | Core fields → type | Relationships |
|------------|-------------------|---------------|
| `appointments` | `appointment_id` (Int32), `patient_id` (Int32), `doctor_id` (Int32), `appointment_date` (String), `status` (String) | Refs `patients.patient_id` and `doctors.doctor_id` |
| `billing` | `billing_id` (Int32), `appointment_id` (Int32), `amount` (Int32), `payment_status` (String) | One‑to‑one with `appointments` |
| `doctors` | `doctor_id` (Int32), `name` (String), `specialization` (String), `contact_info` (String) | Referenced by `appointments` |
| `patients` | `patient_id` (Int32), `name` (String), `age` (Int32), `gender` (String), `contact_info` (String) | Referenced by `appointments` & `billing` |

---

## Repository map

``` 
data/                     -- synthetic CSVs (<1 MB each)
scripts/
  └─ playground.mongodb.js   -- CRUD + 5 aggregation examples
docs/
  ├─ Certificate_MongoDB.pdf
  └─ collections.docx
notebooks/
  └─ Synthetic_Hospital_Data.ipynb   (creates the CSVs)
README.md                -- this file
```

---

## Scripts
| File | What it does |
|------|--------------|
| `playground.mongodb.js` | One‑stop playground: basic CRUD plus five aggregation pipelines (revenue by doctor, appointment status counts, outstanding invoices, etc.). |

---

## Synthetic data
All CSVs in `data/` are **synthetic**, generated with `notebooks/Synthetic_Hospital_Data.ipynb` using `faker` + `pandas`. Feel free to rerun the notebook to create a fresh dataset.

---

## Getting Started
```bash
# 1. clone
git clone https://github.com/f-petrozzi/MongoDB.git
cd MongoDB

# 2. start MongoDB locally or connect to Atlas (default port 27017)

# 3. import synthetic CSVs
mongoimport --db hospital --collection HospitalDB.Patients      --type csv --headerline --file data/patients.csv
mongoimport --db hospital --collection HospitalDB.Doctors       --type csv --headerline --file data/doctors.csv
mongoimport --db hospital --collection HospitalDB.Appointments  --type csv --headerline --file data/appointments.csv
mongoimport --db hospital --collection HospitalDB.Billing       --type csv --headerline --file data/billing.csv

# 4. run the playground script
mongosh < scripts/playground.mongodb.js
```

---

### Using MongoDB Atlas

This project can also be run on **MongoDB Atlas** instead of a local instance.

1. Create a free cluster at [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. Use the **Data Import** tool to upload each CSV from `data/` into its respective collection
3. Open the **Playground** tab and paste code from `scripts/playground.mongodb.js` to run queries and pipelines

Make sure your database is named `hospital` and your collections are named:
- `Patients`
- `Doctors`
- `Appointments`
- `Billing`

All CRUD and aggregation examples in the playground script work without modification in the Atlas UI.

---

## Certificate

`docs/Certificate_MongoDB.pdf` — proof of completion for MongoDB University: Introduction to MongoDB
