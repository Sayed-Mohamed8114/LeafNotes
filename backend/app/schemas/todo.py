from pydantic import BaseModel ,ConfigDict
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

    model_config = ConfigDict(from_attributes=True)

class TodoUpdate(BaseModel):
    title:str | None = None
    description: str | None = None 
    due_date : datetime | None = None 
    completed : bool | None = None