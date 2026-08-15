import pytest

@pytest.mark.asyncio
async def test_lock_slot(client):
    response = await client.post("/api/v1/appointments/lock-slot", json={
        "doctor_id": 1,
        "slot_time": "2026-08-15T10:00:00"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "locked"
