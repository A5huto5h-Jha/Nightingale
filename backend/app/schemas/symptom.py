from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime

class SymptomAnalyzeRequest(BaseModel):
    symptom_text: str
    tags: List[str] = []
    user_vitals: Dict[str, Any] = {}

class SymptomLogBase(BaseModel):
    symptom_text: Optional[str] = None
    tags: List[str] = []
    vitals: Dict[str, Any] = {}

class SymptomLog(SymptomLogBase):
    id: int
    user_id: int
    analysis_result: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True
