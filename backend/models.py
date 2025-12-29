from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from .database import Base
import datetime
import enum

class Role(str, enum.Enum):
    admin = "admin"
    analyst = "analyst"
    viewer = "viewer"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(Enum(Role), default=Role.viewer)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(String)
    amount = Column(Float)
    term = Column(Integer)
    interest_rate = Column(Float)
    status = Column(String)
    stage = Column(Integer, default=1)  # IFRS 9 stage
    pd = Column(Float)  # Probability of Default
    lgd = Column(Float)  # Loss Given Default
    ead = Column(Float)  # Exposure at Default
    ecl = Column(Float)  # Expected Credit Loss
    uploaded_at = Column(DateTime, default=datetime.datetime.utcnow)
