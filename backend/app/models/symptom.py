from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from datetime import datetime
from app.core.database import Base

class SymptomLog(Base):
    __tablename__ = "symptom_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    symptom_text = Column(String)
    tags = Column(JSON)  # List of tags
    vitals = Column(JSON)  # Dict of vitals
    analysis_result = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
