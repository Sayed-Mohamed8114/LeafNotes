from pydantic import BaseModel 

# make the validation for the token 
class Token(BaseModel):
    access_token:str 
    token_type:str