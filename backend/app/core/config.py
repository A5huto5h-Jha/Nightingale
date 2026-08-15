from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "PulseCare Backend API"
    ENVIRONMENT: str = "development"
    SECRET_KEY: str = "SECRET"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

    # PostgreSQL
    DATABASE_URL: str = "postgresql+asyncpg://pulsecare_user:pulsecare_password@localhost:5432/pulsecare_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # External APIs
    PAYMENT_GATEWAY_KEY: str = ""
    PAYMENT_GATEWAY_SECRET: str = ""
    OPENAI_API_KEY: str = ""
    NOTIFICATION_API_KEY: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
