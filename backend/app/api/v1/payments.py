from fastapi import APIRouter, Depends, Request
from app.schemas.payment import UPIIntentResponse
from app.services.upi_payment import UPIPaymentService

router = APIRouter()

@router.post("/generate-intent", response_model=UPIIntentResponse)
async def generate_payment_intent(appointment_id: str, amount: float):
    """
    FEATURE HINT [UPI Intent]:
    Generate deep-links for GPay/PhonePe.
    """
    return await UPIPaymentService.generate_upi_intent(appointment_id, amount)

@router.post("/webhook")
async def payment_webhook(request: Request):
    """
    FEATURE HINT [Payment Webhook]:
    Verify gateway signature and confirm appointment.
    """
    payload = await request.body()
    signature = request.headers.get("X-Payment-Signature")
    verified = await UPIPaymentService.verify_webhook_signature(payload, signature)
    if not verified:
        return {"status": "failed", "detail": "Invalid signature"}
    return {"status": "success"}
