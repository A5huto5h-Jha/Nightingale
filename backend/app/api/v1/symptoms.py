from fastapi import APIRouter, Depends
from app.schemas.symptom import SymptomAnalyzeRequest
from app.services.symptom_triage import SymptomTriageEngine

router = APIRouter()

@router.post("/analyze")
async def analyze_symptoms(request: SymptomAnalyzeRequest):
    """
    FEATURE HINT [AI Symptom Triage]:
    Evaluates symptoms and redirects to emergency if critical.
    """
    return await SymptomTriageEngine.analyze_symptoms(
        request.symptom_text, 
        request.tags, 
        request.user_vitals
    )
