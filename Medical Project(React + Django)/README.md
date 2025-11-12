# Medical Appointment System

Simple appointments app with Django REST API and React frontend.
- Roles: Admin, Doctor, Patient
- Auth: JWT
- Core: Doctor availability, booking with validation, simple dashboards

## Install

Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py createsuperuser  # create admin
python3 manage.py runserver
```

Frontend
```bash
cd frontend
npm install
npm start
```

## Use

1) Admin (approve users)
- Open http://localhost:8000/admin
- Users → edit your superuser → set Role = Admin and Is approved = checked → Save
- In the app (http://localhost:3000) login as Admin
- Admin Dashboard → Users tab → Approve doctors/patients
- Admin Dashboard → Specialties tab → Add specialties (optional)

2) Doctor
- Register with role Doctor, login
- Doctor Dashboard → Availability → Add day/time ranges
- Doctor Dashboard → Profile → Update details

3) Patient
- Register with role Patient, login
- Patient Dashboard → Doctors → pick a doctor → Book Appointment
  - Date must match the day the doctor is available
  - Time must be within start–end window
- Patient Dashboard → My Appointments → view/cancel
- Doctor can approve/reject from Doctor Dashboard → Appointments

Notes
- Emails print to backend console (console backend)
- Default DB is SQLite
- If patient doesn’t see doctors: make sure doctor is approved and has availability

Troubleshooting
- CORS: backend must be running (http://localhost:8000)
- DB: python3 manage.py migrate
- Tokens: check localStorage in the browser

