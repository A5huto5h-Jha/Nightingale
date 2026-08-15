from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import timedelta

from app.core.database import get_db
from app.core.security import create_access_token
from app.services.auth_service import AuthService
from app.schemas.user import User, UserCreate

router = APIRouter()

@router.post("/register", response_model=User)
async def register(user_in: UserCreate, db: AsyncSession = Depends(get_db)):
    user = await AuthService.get_user_by_email(db, user_in.email)
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    return await AuthService.create_user(db, user_in)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await AuthService.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(subject=user.id)
    return {"access_token": access_token, "token_type": "bearer"}
