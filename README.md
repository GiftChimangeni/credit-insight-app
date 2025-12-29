# Credit Insight App

A full-stack credit risk management and analytics platform built with FastAPI, React, and PostgreSQL. IFRS 9 compliant.

## Features

- Credit Risk Analytics: Staging, ECL calculations, PD/LGD modeling
- Portfolio Management: Real-time metrics, risk segmentation, trends
- Budget vs Actuals: Financial planning and variance analysis
- CSV Upload: Secure loan data ingestion
- Role-based Access: Admin, Analyst, Viewer roles with JWT auth
- Responsive Dashboard: Charts, KPIs, early warning alerts

## Tech Stack

**Backend**: FastAPI, SQLAlchemy, PostgreSQL, JWT  
**Frontend**: React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query

## Quick Start (Recommended: Docker)

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop
2. Clone and run:

```bash
git clone https://github.com/GiftChimangeni/credit-insight-app.git
cd credit-insight-app
docker-compose up --build
