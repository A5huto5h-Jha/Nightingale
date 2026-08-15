from fastapi import HTTPException, status

class PulseCareException(HTTPException):
    def __init__(self, status_code: int, detail: str):
        super().__init__(status_code=status_code, detail=detail)

class AppointmentLockException(PulseCareException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            detail="Slot is currently locked for another transaction."
        )

class EmergencyException(PulseCareException):
    def __init__(self, alert: str):
        super().__init__(
            status_code=499,
            detail=alert
        )
