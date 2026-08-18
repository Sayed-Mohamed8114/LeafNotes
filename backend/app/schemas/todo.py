from pydantic import BaseModel 
from datetime import datetime

class TodoCreate(BaseModel):
    title:str 
    description:str | None = None
    due_date: datetime | None = None 

class TodoResponse(BaseModel):
    id:int
    title:str 
    description: str | None = None 
    due_date : datetime | None = None 
    completed : bool 

class TodoUpdate(BaseModel):
    title:str | None = None
    description: str | None = None 
    due_date : datetime | None = None 
    completed : bool | None = None