import redis.asyncio as redis
from app.core.config import settings

async def get_redis_client():
    """
    FEATURE HINT [Redis Client]:
    Provides an async Redis client for caching and locking.
    """
    client = redis.from_url(settings.REDIS_URL, decode_responses=True)
    return client
