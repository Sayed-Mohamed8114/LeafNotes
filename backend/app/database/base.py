# we create it because sqlalchemy need to know that this classes is a database models 
from sqlalchemy.orm import DeclarativeBase 
# DeclarativeBase make sqlalchemy understand that database tables useing python classes instead of writing direct sql 

class Base(DeclarativeBase):
    pass 

