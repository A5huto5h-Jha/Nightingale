from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.user import User

router = APIRouter()

@router.get("/me", response_model=User)
async def get_current_user(db: AsyncSession = Depends(get_db)):
    # FEATURE HINT [User Profile]: Return authenticated user details.
    pass
