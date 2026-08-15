from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from datetime import datetime
from app.core.database import Base

class PaymentTransaction(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"))
    amount = Column(Float)
    currency = Column(String, default="INR")
    transaction_id = Column(String, unique=True)
    status = Column(String)  # pending, success, failed
    provider = Column(String)  # razorpay, cashfree
    created_at = Column(DateTime, default=datetime.utcnow)
