from fastapi import APIRouter ,status , Depends
from app.schemas.todo import TodoResponse , TodoCreate , TodoUpdate
from app.crud.todo import get_todos , create_todo , get_one_todo_based_on_id , edit_todo
from app.models.user import User
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.dependencies.get_current_user import get_current_user

router = APIRouter(
    prefix="/todos",
    tags=["Todos"]
)

@router.get("/all" , response_model=list[TodoResponse] , status_code=status.HTTP_200_OK)
def get_all_todos(db:Session = Depends(get_db) , current_user:User=Depends(get_current_user)):
    return get_todos(db,current_user.id)

@router.post("", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
def create_new_todo( todo_data:TodoCreate , db: Session = Depends(get_db) ,current_user : User = Depends(get_current_user)):
    return create_todo(db, todo_data ,current_user.id)

@router.get("/{todo_id}", response_model=TodoResponse , status_code=status.HTTP_200_OK)
def get_todo_with_id(todo_id:int ,db: Session = Depends(get_db) , current_user : User = Depends(get_current_user)):
    return get_one_todo_based_on_id(db,current_user.id,todo_id)

@router.patch("/{todo_id}",response_model=TodoResponse , status_code=status.HTTP_200_OK)
def update_todo(todo_data:TodoUpdate , todo_id:int, db: Session = Depends(get_db) , current_user:User =Depends(get_current_user)):
    return edit_todo(db , current_user.id , todo_data , todo_id)
    