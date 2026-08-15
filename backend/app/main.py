"""
PulseCare API Entrypoint
Initializes FastAPI, registers CORS middleware, handles global exceptions,
and mounts API routers.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/health", tags=["Health Check"])
async def health_check():
    """
    FEATURE HINT [Health Check]: Used by load balancers & Docker containers
    to verify server responsiveness.
    """
    return {"status": "healthy", "service": settings.PROJECT_NAME}
