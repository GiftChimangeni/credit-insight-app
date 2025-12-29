from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class LoanBase(BaseModel):
    customer_id: str
    amount: float
    term: int
    interest_rate: float
    status: str

class LoanCreate(LoanBase):
    pass

class LoanResponse(LoanBase):
    id: int
    stage: int
    pd: Optional[float]
    lgd: Optional[float]
    ead: Optional[float]
    ecl: Optional[float]
    uploaded_at: datetime

    class Config:
        from_attributes = True

class PortfolioMetrics(BaseModel):
    total_portfolio: float
    total_ecl: float
    npl_ratio: float
    active_borrowers: int
    stage_1_amount: float
    stage_2_amount: float
    stage_3_amount: float
