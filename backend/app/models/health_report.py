from datetime import date

from sqlalchemy import BigInteger, CheckConstraint, Date, DateTime, ForeignKey, Identity, Index, String, Text, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base, TimestampMixin


class PatientHealthReport(TimestampMixin, Base):
    __tablename__ = "patient_health_reports"
    __table_args__ = (
        CheckConstraint("file_size_bytes IS NULL OR file_size_bytes >= 0", name="non_negative_file_size"),
        Index("ix_patient_health_reports_patient_report_date", "patient_id", "report_date"),
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(), primary_key=True)
    patient_id: Mapped[int] = mapped_column(ForeignKey("patients.id", ondelete="RESTRICT"), nullable=False)
    doctor_id: Mapped[int | None] = mapped_column(ForeignKey("doctors.id", ondelete="SET NULL"), nullable=True)
    report_type: Mapped[str] = mapped_column(String(50), nullable=False)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    file_url: Mapped[str] = mapped_column(String(2000), nullable=False)
    file_mime_type: Mapped[str | None] = mapped_column(String(255), nullable=True)
    file_size_bytes: Mapped[int | None] = mapped_column(nullable=True)
    report_date: Mapped[date] = mapped_column(Date, nullable=False)
    uploaded_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=text("now()")
    )

    patient = relationship("Patient", back_populates="health_reports")
    doctor = relationship("Doctor")
