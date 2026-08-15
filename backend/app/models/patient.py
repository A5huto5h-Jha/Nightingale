from datetime import date

from sqlalchemy import BigInteger, CheckConstraint, Date, ForeignKey, Identity, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base, TimestampMixin


class Patient(TimestampMixin, Base):
    __tablename__ = "patients"
    __table_args__ = (
        CheckConstraint("sex IN ('male', 'female', 'other', 'prefer_not_to_say')", name="valid_patient_sex"),
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(), primary_key=True)
    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="RESTRICT"), unique=True, nullable=False
    )
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    date_of_birth: Mapped[date] = mapped_column(Date, nullable=False)
    sex: Mapped[str] = mapped_column(String(32), nullable=False)
    phone: Mapped[str | None] = mapped_column(String(32), nullable=True)
    emergency_contact: Mapped[str | None] = mapped_column(String(255), nullable=True)

    user = relationship("User", back_populates="patient")
    appointments = relationship("Appointment", back_populates="patient")
    health_reports = relationship("PatientHealthReport", back_populates="patient")
    medical_history_entries = relationship("PatientMedicalHistoryEntry", back_populates="patient")
