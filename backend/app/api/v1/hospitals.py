from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.schemas.hospital import Hospital

router = APIRouter()

@router.get("/", response_model=List[Hospital])
async def list_hospitals(city: str = None, db: AsyncSession = Depends(get_db)):
    # FEATURE HINT [Hospital Discovery]: Locate hospitals by city or name.
    pass
