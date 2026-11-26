
from fastapi import FastAPI

app = FastAPI(
    title="SpendWise API",
    description="Expense Tracker Backend API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to SpendWise API",
        "status": "running"
    }
