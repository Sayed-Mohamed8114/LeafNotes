from database.base import Base 
from datetime import datetime
from sqlalchemy import DateTime ,ForeignKey
from sqlalchemy.orm import Mapped , mapped_column ,relationship
from models.user import User

class Todo(Base):
    __tablename__ = "todos"
    # this will make for us a increamental primary_key 
    id: Mapped[int] = mapped_column(primary_key=True)
    title:Mapped[str]  
    description:Mapped[str|None]
    due_date : Mapped[datetime|None] = mapped_column(DateTime,nullable=True)
    completed:Mapped[bool] = mapped_column(default=False)
    user_id :Mapped[int] = mapped_column(ForeignKey("users.id"), nullable=False)
    user:Mapped["User"] = relationship(back_populates="todos")