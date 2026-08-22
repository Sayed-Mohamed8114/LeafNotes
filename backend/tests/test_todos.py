def test_create_new_todo(client):
    is_registered = client.post("/auth/register" ,json={
            "name": "sayed",
            "email": "sayed@example.com",
            "password": "test1111"
        })
    assert is_registered.status_code == 201 
    is_login = client.post("/auth/login",json={
            "email":"sayed@example.com",
            "password":"test1111"
            })
    assert is_login.status_code == 200
    token = is_login.json()["access_token"]

    response = client.post(
        "/todos",
        json={
            "title": "Learn FastAPI",
            "description": "Build Todo CRUD"
        },
        headers = {
            "Authorization":f"Bearer {token}"
        }
    )
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Learn FastAPI"
    assert data["description"] == "Build Todo CRUD"
    assert data["completed"] is False

def test_get_all_todos(client):
    is_registered = client.post("/auth/register", json={
        "name": "sayed",
        "email": "sayed@example.com",
        "password": "test1111"
    })

    assert is_registered.status_code == 201

    is_login = client.post("/auth/login", json={
        "email": "sayed@example.com",
        "password": "test1111"
    })

    assert is_login.status_code == 200

    token = is_login.json()["access_token"]

    todo_response = client.post(
        "/todos",
        json={
            "title": "Learn FastAPI",
            "description": "Build Todo CRUD"
        },
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert todo_response.status_code == 201

    response = client.get(
        "/todos/all",
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 200

    todos = response.json()

    assert len(todos) == 1
    assert todos[0]["title"] == "Learn FastAPI"
    assert todos[0]["description"] == "Build Todo CRUD"
    assert todos[0]["completed"] is False
