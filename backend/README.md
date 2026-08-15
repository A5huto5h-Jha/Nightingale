# PulseCare Backend API Architecture

This directory houses the async RESTful backend services powering **PulseCare**—a unified multi-hospital doctor appointment booking ecosystem.

## Setup & Running Locally

1. **Environment Setup:**
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env
   ```

2. **Database & Migrations:**
   ```bash
   alembic upgrade head
   ```

3. **Start FastAPI Development Server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

4. **API Documentation:**
   * Swagger UI: `http://localhost:8000/docs`
   * ReDoc: `http://localhost:8000/redoc`

## Modules & Architecture Summary

* `app/api/v1/`: API endpoints split by domain (auth, appointments, payments, etc.).
* `app/services/symptom_triage.py`: AI/Rule Engine mapping patient symptoms to medical specialties.
* `app/services/slot_manager.py`: Redis-based concurrency locking for slot bookings.
* `app/services/queue_engine.py`: Real-time OPD token and live queue tracker.
* `app/services/upi_payment.py`: UPI Intent & Webhook verification workflows.
