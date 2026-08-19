import jwt
from app.core.config import settings
from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash

password_hasher = PasswordHash.recommended()

# hashing password
def hash_password(password: str) -> str:
    return password_hasher.hash(password)

# vertify if the user enter the password correctly or not 
def verify_password(password: str, hashed_password: str) -> bool:
    return password_hasher.verify(password, hashed_password)

# creating JWT 
def create_access_token(data:dict)->str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc)+timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    to_encode.update({"exp":expire})
    encode_jwt = jwt.encode(
        to_encode ,
        settings.JWT_SECRET_KEY,
        algorithm=settings.JWT_ALGORITHM
    )

    return encode_jwt
