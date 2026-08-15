from pydantic import BaseModel
from typing import Optional

class DoctorBase(BaseModel):
    specialty: Optional[str] = None
    consultation_fee: Optional[int] = None
    bio: Optional[str] = None
    hospital_id: Optional[int] = None

class DoctorCreate(DoctorBase):
    user_id: int
    hospital_id: int
    specialty: str
    consultation_fee: int

class Doctor(DoctorBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
