// Switch to the correct database
use("HospitalDB");

// Insert one
db.Patients.insertOne({
  "patient_id": 11,
  "name": "Alice Green",
  "age": 30,
  "gender": "F",
  "contact_info": "alicegreen@mail.com"
});

// Insert multiple
db.Doctors.insertMany([
  {
    "doctor_id": 105,
    "name": "Dr. Kevin Brown",
    "specialization": "Dermatology",
    "contact_info": "kevin.brown@hospital.com"
  },
  {
    "doctor_id": 106,
    "name": "Dr. Rachel Lee",
    "specialization": "Pediatrics",
    "contact_info": "rachel.lee@hospital.com"
  }
]);

// Find one/all appointments
db.Appointments.findOne({ "appointment_id": 5001 });
db.Appointments.find({ "status": "Scheduled" });

// Update payment
db.Billing.updateOne({ "billing_id": 9001 }, { $set: { "payment_status": "Paid" } });
db.Billing.updateMany({ "payment_status": "Paid" }, { $set: { "payment_status": "Unpaid" } });

// Delete patients
db.Patients.deleteOne({ "patient_id": 10 });
db.Patients.deleteMany({ "age": { $gt: 50 } });

// Patient Aggregate for gender
db.Patients.aggregate([
  { $group: { _id: "$gender", count: { $sum: 1 } } }
]);

// Appointment Aggregate for appointments
db.Appointments.aggregate([
  { $group: { _id: "$doctor_id", total_appointments: { $sum: 1 } } }
]);

// Billing Aggregate for total amount
db.Billing.aggregate([
  { $group: { _id: null, total_billed: { $sum: "$amount" } } }
]);

// Doctors Aggregate for specializations
db.Doctors.aggregate([
  { $group: { _id: "$specialization", count: { $sum: 1 } } }
]);
