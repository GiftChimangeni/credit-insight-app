from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
from ..database import get_db
from ..models import Loan, User
from ..auth import get_current_user
import csv
from io import StringIO

router = APIRouter(prefix="/loans", tags=["loans"])

def calculate_ecl(amount: float, pd: float = 0.02, lgd: float = 0.45):
    """Simple ECL = EAD * PD * LGD (here EAD ≈ amount)"""
    return amount * pd * lgd

@router.post("/upload")
def upload_csv(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files allowed")
    
    content = file.file.read().decode("utf-8")
    f = StringIO(content)
    reader = csv.DictReader(f)
    
    processed = 0
    for row in reader:
        try:
            amount = float(row["amount"])
            # Simple staging/PD logic (example)
            stage = 1
            pd = 0.01
            if "past_due_days" in row:
                days = int(row.get("past_due_days", 0))
                if days > 90:
                    stage = 3
                    pd = 0.20
                elif days > 30:
                    stage = 2
                    pd = 0.05
            
            loan = Loan(
                customer_id=row["customer_id"],
                amount=amount,
                term=int(row["term"]),
                interest_rate=float(row["interest_rate"]),
                status=row["status"],
                stage=stage,
                pd=pd,
                lgd=0.45,
                ead=amount,
                ecl=calculate_ecl(amount, pd)
            )
            db.add(loan)
            processed += 1
        except Exception:
            continue  # skip bad rows
    
    db.commit()
    return {"processed": processed, "message": "Upload successful"}
