import pytest 
from app.main import app 
from app.database.base import Base 
from app.database.session import get_db
from fastapi.testclient import TestClient
from sqlalchemy.orm import sessionmaker 
from sqlalchemy import create_engine
from app.core.config import settings

# create the test engine and start to make sessions from it  
test_engine = create_engine(settings.TEST_DATABASE_URL)

TestingSessionsLocal = sessionmaker(
    autoflush=False ,
    autocommit=False,
    bind=test_engine
)

# responsible for FastAPI application session (test db) instead of original db 
def override_get_db():
    db = TestingSessionsLocal()
    try:
        yield db 
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db 

@pytest.fixture
def test_db():
    # create the tables and wait for the commits 
    Base.metadata.create_all(bind=test_engine)

    yield  # -> run 

    # drop the tables and clean the db 
    Base.metadata.drop_all(bind=test_engine)

@pytest.fixture
def client(test_db):
    return TestClient(app)



