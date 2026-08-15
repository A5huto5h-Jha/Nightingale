from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash, verify_password

class AuthService:
    @staticmethod
    async def get_user_by_email(db: AsyncSession, email: str):
        result = await db.execute(select(User).where(User.email == email))
        return result.scalars().first()

    @staticmethod
    async def authenticate_user(db: AsyncSession, email: str, password: str):
        user = await AuthService.get_user_by_email(db, email)
        if not user:
            return False
        if not verify_password(password, user.hashed_password):
            return False
        return user

    @staticmethod
    async def create_user(db: AsyncSession, user_in: UserCreate):
        hashed_password = get_password_hash(user_in.password)
        db_user = User(
            email=user_in.email,
            hashed_password=hashed_password,
            full_name=user_in.full_name,
            is_doctor=user_in.is_doctor
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        return db_user
