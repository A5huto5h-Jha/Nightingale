import pytest

@pytest.mark.asyncio
async def test_register_user(client):
    response = await client.post("/api/v1/auth/register", json={
        "email": "test@example.com",
        "password": "testpassword",
        "full_name": "Test User",
        "is_doctor": False
    })
    assert response.status_code == 200
    assert response.json()["email"] == "test@example.com"

@pytest.mark.asyncio
async def test_login_user(client):
    # Register first
    await client.post("/api/v1/auth/register", json={
        "email": "login@example.com",
        "password": "testpassword",
        "full_name": "Login User",
        "is_doctor": False
    })
    
    response = await client.post("/api/v1/auth/login", data={
        "username": "login@example.com",
        "password": "testpassword"
    })
    assert response.status_code == 200
    assert "access_token" in response.json()
