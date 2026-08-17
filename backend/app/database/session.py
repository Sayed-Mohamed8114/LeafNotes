from sqlalchemy import create_engine 
from sqlalchemy.orm import sessionmaker 

from app.core.config import settings 

engine =create_engine(settings.DATABASE_URL)

# sessionlocal here is what can make for you a new session every request 
SessionLocal = sessionmaker(
    # mean that sqlalchemy will not make commit when we edit some thing and we are responsible about making commits 
    autocommit =False , 
    autoflush=False, 
    # here we pass the engine to it that the system will edit on it 
    bind = engine
)

def get_db():
    db =SessionLocal 
    try:
        # yield is saying take the value and i may continue later but if we user return there is no later
        yield db 
    finally:
        db.close 
