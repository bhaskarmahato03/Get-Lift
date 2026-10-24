
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import test_connection

app = FastAPI(
    title="Get-Lift API",
    description="Backend API for the Get-Lift ride-sharing application",
    version="1.0.0",
)

# Allow requests from the React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Get-Lift API!"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Get-Lift Backend",
    }


@app.get("/health/db")
def database_health_check():
    if test_connection():
        return {"status": "healthy", "database": "connected"}
    raise HTTPException(status_code=503, detail="Database connection unavailable")
