from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime

class UPIIntentResponse(BaseModel):
    appointment_id: str
    amount: float
    currency: str
    transaction_ref: str
    upi_intent_urls: Dict[str, str]

class PaymentTransactionBase(BaseModel):
    appointment_id: Optional[int] = None
    amount: Optional[float] = None
    currency: str = "INR"

class PaymentTransaction(PaymentTransactionBase):
    id: int
    transaction_id: Optional[str] = None
    status: str
    provider: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True
