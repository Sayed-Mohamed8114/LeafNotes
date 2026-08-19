from fastapi import APIRouter,Depends,HTTPException, status
from app.schemas.user import UserResponse , UserCreate , UserLogin
from app.core.security import hash_password ,verify_password ,create_access_token
from app.models.user import User 
from app.database.session import get_db
from sqlalchemy.orm import Session
from app.schemas.auth import Token


router = APIRouter(
    prefix="/auth",
    tags=["authentication"]
)


@router.post("/register",response_model=UserResponse,status_code=status.HTTP_201_CREATED)
def regiester_user(user_data:UserCreate, db:Session = Depends(get_db)):
    exiting_email = db.query(User).filter(
        User.email == user_data.email
    ).first()
    if exiting_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT ,
            detail= "Email already regiestered"
        )
    
    password_hash = hash_password(user_data.password)
    new_user = User(
        name = user_data.name,
        email = user_data.email,
        password_hash = password_hash
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.post("/login" , response_model=Token , status_code=status.HTTP_200_OK)
def login_user(user_data:UserLogin , db : Session = Depends(get_db)):
    user = db.query(User).filter(
        User.email == user_data.email
    ).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid email or password"
        )
    
    valid = verify_password(user_data.password , user.password_hash)
    if not valid :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid email or password"
        )
    access_token = create_access_token(data={"sub":str(user.id)})
    return {
        "access_token":access_token,
        "token_type":"bearer"
    }