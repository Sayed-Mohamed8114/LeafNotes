from fastapi import FastAPI
from app.routers.auth import router as auth_router
from app.routers.todo import router as todo_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(todo_router)