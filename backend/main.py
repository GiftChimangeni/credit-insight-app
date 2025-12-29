from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, loans, portfolio
import os

app = FastAPI(
    title="Credit Insight Engine API",
    description="IFRS 9 Credit Risk Analytics Platform",
    version="1.0.0"
)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(loans.router)
app.include_router(portfolio.router)

@app.get("/")
def root():
    return {"message": "Credit Insight Engine API is running!"}

@app.get("/api")
def api_root():
    return {"message": "Welcome to the Credit Insight API"}
