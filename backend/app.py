from fastapi import FastAPI

from database.connection import engine
from database.base import Base

from models.employee_model import Employee

from routes.employee_routes import router as employee_router
from fastapi.middleware.cors import CORSMiddleware
from models.user import User

Base.metadata.create_all(bind=engine)
app = FastAPI()
from routes.auth_routes import router as auth_router

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)
app.add_middleware(

    CORSMiddleware,

    allow_origins=["http://localhost:5173",
        "http://127.0.0.1:5173"],

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