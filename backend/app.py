from fastapi import FastAPI

from database.connection import engine
from database.base import Base

from models.employee_model import Employee

from routes.employee_routes import router as employee_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


app.include_router(employee_router)


@app.get("/")
def home():

    return {
        "message": "Autonomous Onboarding Coordinator Running Successfully"
    }