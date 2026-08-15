from sqlalchemy import BigInteger, Boolean, CheckConstraint, ForeignKey, Identity, Index, Integer, SmallInteger, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base, TimestampMixin


class DoctorWeeklyAvailability(TimestampMixin, Base):
    __tablename__ = "doctor_weekly_availability"
    __table_args__ = (
        CheckConstraint("day_of_week BETWEEN 0 AND 6", name="valid_day_of_week"),
        CheckConstraint("start_time < end_time", name="availability_start_before_end"),
        CheckConstraint("slot_minutes IS NULL OR slot_minutes > 0", name="positive_slot_minutes"),
        Index("ix_doctor_weekly_availability_doctor_day_active", "doctor_id", "day_of_week", "is_active"),
    )

    id: Mapped[int] = mapped_column(BigInteger, Identity(), primary_key=True)
    doctor_id: Mapped[int] = mapped_column(ForeignKey("doctors.id", ondelete="RESTRICT"), nullable=False)
    day_of_week: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    start_time: Mapped[Time] = mapped_column(Time, nullable=False)
    end_time: Mapped[Time] = mapped_column(Time, nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    slot_minutes: Mapped[int | None] = mapped_column(Integer, nullable=True)

    doctor = relationship("Doctor", back_populates="availabilities")
