# PulseCare Backend System Architecture

## Core Workflows & Logic Maps

### 1. Concurrent Slot Booking & Hold-Capture Flow
1. **User selects slot** -> `POST /api/v1/appointments/lock-slot`
2. **Backend locks slot in Redis** for 7 minutes using `slot_manager.py`.
3. **Frontend renders UPI Payment Interface**.
4. **User completes UPI payment** -> Payment Gateway sends Webhook to `/api/v1/payments/webhook`.
5. **Backend verifies signature** -> Converts Redis lock into permanent PostgreSQL appointment record in `appointments/` table.
6. **Token Issued**: Assigns dynamic OPD token number (`Token #18`).

### 2. AI Symptom Triage Engine
1. User provides natural language symptom text or tags -> `POST /api/v1/symptoms/analyze`.
2. **Rule Engine + LLM fallback** evaluates symptoms against medical domain dictionary.
3. **Emergency Check**: If critical tags match (e.g., chest pain, stroke symptoms), API immediately returns an **Emergency Override Code (`499 EMERGENCY_REDIRECT`)** instructing UI to display ICU/Emergency Call CTAs.
