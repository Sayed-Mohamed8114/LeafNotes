from sqlalchemy.orm import Session
from app.models.todo import Todo
from app.schemas.todo import TodoCreate
from fastapi import HTTPException,status

def get_todos(db:Session , user_id:int):
    return db.query(Todo).filter(
        Todo.user_id == user_id
    ).all()

def create_todo(db: Session , todo_data :TodoCreate , user_id:int):
    todo = Todo(
        title=todo_data.title ,
        description = todo_data.description ,
        due_date= todo_data.due_date,
        user_id = user_id
    )
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo 

def get_one_todo_based_on_id(db: Session , user_id:int , todo_id:int):
    todo = db.query(Todo).filter(
        Todo.user_id == user_id  , Todo.id == todo_id
    ).first()
    if todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return todo
