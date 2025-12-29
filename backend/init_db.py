from database import engine, Base
from models import User, Loan  # import to register
from sqlalchemy.orm import Session
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init_db():
    Base.metadata.create_all(bind=engine)
    
    # Seed default admin user
    from database import SessionLocal
    db: Session = SessionLocal()
    if not db.query(User).filter(User.email == "admin@example.com").first():
        hashed = pwd_context.hash("password")
        admin = User(email="admin@example.com", hashed_password=hashed, role="admin")
        db.add(admin)
        db.commit()
    db.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized with default admin (admin@example.com / password)")
