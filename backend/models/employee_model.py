from sqlalchemy import Column, Integer, String
from database.base import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    role = Column(String, nullable=False)

    department = Column(String, nullable=False)

    onboarding_status = Column(
        String,
        default="Pending"
    )