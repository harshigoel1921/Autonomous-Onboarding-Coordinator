from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.connection import get_db

from models.employee_model import Employee
from models.employee_schema import EmployeeCreate
from workflows.onboarding_workflow import start_onboarding_workflow
from services.ai_service import (
    generate_onboarding_recommendations
)
router = APIRouter()


@router.post("/add_employee")
def add_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):

    new_employee = Employee(
        name=employee.name,
        email=employee.email,
        role=employee.role,
        department=employee.department
    )

    db.add(new_employee)

    db.commit()

    db.refresh(new_employee)
    start_onboarding_workflow(new_employee, db)
    return {
        "message": "Employee added successfully",
        "employee_id": new_employee.id
    }

@router.get("/employees")
def get_employees(
    db: Session = Depends(get_db)
):

    employees = db.query(Employee).all()

    employee_list = []

    for employee in employees:

        recommendations = (
            generate_onboarding_recommendations(
                employee.role
            )
        )

        employee_list.append({

            "id": employee.id,

            "name": employee.name,

            "email": employee.email,

            "role": employee.role,

            "department": employee.department,

            "onboarding_status":
            employee.onboarding_status,

            "ai_recommendations":
            recommendations
        })

    return employee_list