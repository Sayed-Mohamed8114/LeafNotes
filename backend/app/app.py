from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def app_work():
    return {"message":"hello from fast api"}