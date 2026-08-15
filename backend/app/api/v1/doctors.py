from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.schemas.doctor import Doctor

router = APIRouter()

@router.get("/", response_model=List[Doctor])
async def list_doctors(specialty: str = None, db: AsyncSession = Depends(get_db)):
    # FEATURE HINT [Doctor Listing]: Filter doctors by specialty and availability.
    pass
