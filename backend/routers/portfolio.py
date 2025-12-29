from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..database import get_db
from ..models import Loan
from ..schemas import PortfolioMetrics

router = APIRouter(prefix="/portfolio", tags=["portfolio"])

@router.get("/metrics", response_model=PortfolioMetrics)
def get_metrics(db: Session = Depends(get_db)):
    total_portfolio = db.query(func.sum(Loan.amount)).scalar() or 0
    total_ecl = db.query(func.sum(Loan.ecl)).scalar() or 0
    total_loans = db.query(Loan).count()
    npl_count = db.query(Loan).filter(Loan.stage == 3).count()
    npl_ratio = (npl_count / total_loans * 100) if total_loans > 0 else 0
    active_borrowers = db.query(Loan.customer_id).distinct().count()

    stage_1 = db.query(func.sum(Loan.amount)).filter(Loan.stage == 1).scalar() or 0
    stage_2 = db.query(func.sum(Loan.amount)).filter(Loan.stage == 2).scalar() or 0
    stage_3 = db.query(func.sum(Loan.amount)).filter(Loan.stage == 3).scalar() or 0

    return PortfolioMetrics(
        total_portfolio=total_portfolio,
        total_ecl=total_ecl,
        npl_ratio=round(npl_ratio, 1),
        active_borrowers=active_borrowers,
        stage_1_amount=stage_1,
        stage_2_amount=stage_2,
        stage_3_amount=stage_3
    )
