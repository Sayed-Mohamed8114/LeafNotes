from sqlalchemy.orm import Session
from app.models.todo import Todo
from app.schemas.todo import TodoCreate

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
