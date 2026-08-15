import pytest

@pytest.mark.asyncio
async def test_analyze_symptoms_emergency(client):
    response = await client.post("/api/v1/symptoms/analyze", json={
        "symptom_text": "I have severe chest pain and cannot breathe",
        "tags": ["chest pain"],
        "user_vitals": {"bp": "140/90"}
    })
    assert response.status_code == 200
    assert response.json()["is_emergency"] is True

@pytest.mark.asyncio
async def test_analyze_symptoms_normal(client):
    response = await client.post("/api/v1/symptoms/analyze", json={
        "symptom_text": "I have a mild headache",
        "tags": ["headache"]
    })
    assert response.status_code == 200
    assert response.json()["is_emergency"] is False
