from pydantic import BaseModel
from typing import Optional

class HospitalBase(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None

class HospitalCreate(HospitalBase):
    name: str
    address: str
    city: str

class Hospital(HospitalBase):
    id: int

    class Config:
        from_attributes = True
