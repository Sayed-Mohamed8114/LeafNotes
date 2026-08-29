from pydantic import BaseModel ,ConfigDict , EmailStr , Field

class UserCreate(BaseModel):
    name:str 
    email:EmailStr 
    password:str = Field(min_length=8 , max_length=20) 

class UserResponse(BaseModel):
    id:int 
    name:str
    email:str
    model_config = ConfigDict(from_attributes=True)
 

class UserLogin(BaseModel):
    email:str
    password:str