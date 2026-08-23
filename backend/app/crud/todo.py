from sqlalchemy.orm import Session
from app.models.todo import Todo
from app.schemas.todo import TodoCreate , TodoUpdate
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

def edit_todo(db: Session , user_id:int , todo_data:TodoUpdate,  todo_id:int):
    todo = db.query(Todo).filter(
        Todo.user_id == user_id , Todo.id == todo_id
    ).first()
    if todo is None:
        raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Todo not found"
        )
    update_data = todo_data.model_dump(exclude_unset = True)
    for field , value in update_data.items():
        setattr(todo,field,value)

    db.commit()
    db.refresh(todo)
    return todo

def remove_todo(db: Session , user_id:int,   todo_id : int):
    todo = db.query(Todo).filter(
        Todo.id == todo_id , Todo.user_id == user_id
    ).first()

    if todo is None:
        raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Todo not found"
            )
    db.delete(todo)
    db.commit()
    return None
     
    