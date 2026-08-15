from fastapi import APIRouter
from app.api.v1 import auth, users, doctors, hospitals, symptoms, appointments, payments

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(doctors.router, prefix="/doctors", tags=["Doctors"])
api_router.include_router(hospitals.router, prefix="/hospitals", tags=["Hospitals"])
api_router.include_router(symptoms.router, prefix="/symptoms", tags=["Symptoms"])
api_router.include_router(appointments.router, prefix="/appointments", tags=["Appointments"])
api_router.include_router(payments.router, prefix="/payments", tags=["Payments"])
