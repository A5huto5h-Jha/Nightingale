from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.appointment import AppointmentStatus

class AppointmentBase(BaseModel):
    doctor_id: Optional[int] = None
    slot_time: Optional[datetime] = None

class AppointmentCreate(AppointmentBase):
    doctor_id: int
    slot_time: datetime

class Appointment(AppointmentBase):
    id: int
    user_id: int
    status: AppointmentStatus
    token_number: Optional[int] = None

    class Config:
        from_attributes = True
