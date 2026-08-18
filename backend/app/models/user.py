from app.database.base import Base 
from sqlalchemy.orm import Mapped , mapped_column , relationship 
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.models.todo import Todo


class User(Base):
    __tablename__ = "users"
    id:Mapped[int] = mapped_column(primary_key=True)
    name:Mapped[str] 
    email:Mapped[str] = mapped_column(unique=True , index=True)
    password_hash:Mapped[str]
    todos:Mapped[list["Todo"]] = relationship(back_populates="user")
