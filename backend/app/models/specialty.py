from sqlalchemy import BigInteger, Column, ForeignKey, Identity, Index, String, Table
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


doctor_specialties = Table(
    "doctor_specialties",
    Base.metadata,
    Column("doctor_id", BigInteger, ForeignKey("doctors.id", ondelete="RESTRICT"), primary_key=True),
    Column(
        "specialty_id",
        BigInteger,
        ForeignKey("specialties.id", ondelete="RESTRICT"),
        primary_key=True,
    ),
    Index("ix_doctor_specialties_specialty_doctor", "specialty_id", "doctor_id"),
)


class Specialty(Base):
    __tablename__ = "specialties"

    id: Mapped[int] = mapped_column(BigInteger, Identity(), primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String(1000), nullable=True)

    doctors = relationship("Doctor", secondary=doctor_specialties, back_populates="specialties")
