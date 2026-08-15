from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.appointment import Appointment, AppointmentCreate
from app.services.slot_manager import SlotManagerService
from app.services.queue_engine import QueueEngineService

router = APIRouter()

@router.post("/lock-slot")
async def lock_appointment_slot(appointment_in: AppointmentCreate, user_id: int = 1):
    """
    FEATURE HINT [Slot Locking]:
    Temporary Redis lock before payment.
    """
    locked = await SlotManagerService.acquire_slot_lock(
        str(appointment_in.doctor_id), 
        str(appointment_in.slot_time), 
        str(user_id)
    )
    if not locked:
        raise HTTPException(status_code=409, detail="Slot already being booked")
    return {"status": "locked", "ttl": 420}

@router.get("/{doctor_id}/queue")
async def get_doctor_queue(doctor_id: int, hospital_id: int):
    """
    FEATURE HINT [Live Queue]:
    Real-time OPD token tracking.
    """
    return await QueueEngineService.get_live_queue_status(str(doctor_id), str(hospital_id))
