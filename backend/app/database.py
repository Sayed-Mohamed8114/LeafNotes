from .config import settings 
from sqlalchemy import create_engine,text

engine = create_engine(
    settings.DATABASE_URL
)
