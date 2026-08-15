from sqlalchemy import Column, Integer, String, ForeignKey
from app.core.database import Base

class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    hospital_id = Column(Integer, ForeignKey("hospitals.id"))
    specialty = Column(String, index=True)
    consultation_fee = Column(Integer)
    bio = Column(String)
