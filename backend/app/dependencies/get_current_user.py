from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends , HTTPException , status
from sqlalchemy.orm import Session
import jwt
from app.database.session import get_db
from app.core.config import settings
from app.models.user import User

oauth2_shceme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

def get_current_user(token:str = Depends(oauth2_shceme) , db:Session = Depends(get_db)):
    try:
       payload = jwt.decode(
            token , 
            settings.JWT_SECRET_KEY , 
            algorithms=[settings.JWT_ALGORITHM]   
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials"
        )
    
    try :
        user_id = int(user_id)
    except (TypeError, ValueError):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials"
            )
    
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail= "couldn't find validate credentails"
        )

    return user