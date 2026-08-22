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

def test_user_only_see_his_own_todos(client):
    user_a = client.post(
        "/auth/register",
        json={
            "name": "sayed",
            "email": "sayed@example.com",
            "password": "test1111"
        }  
    )
    assert user_a.status_code == 201

    login_a = client.post(
        "/auth/login",
        json={
            "email":"sayed@example.com",
            "password":"test1111"
        }
    )
    token_a = login_a.json()["access_token"]

    user_a_todo_create = client.post(
        "/todos",
        json={
            "title":"by user a",
            "description":"created by user 1"
        },
        headers = {
            "Authorization" : f"Bearer {token_a}"
        }
    )
    assert user_a_todo_create.status_code == 201

    user_b = client.post(
        "/auth/register",
        json={
            "name":"mohamed",
            "email":"mohamed@gmail.com",
            "password":"test2222"
        }
    )
    assert user_b.status_code == 201

    login_b = client.post(
        "/auth/login", 
        json={
            "email":"mohamed@gmail.com",
            "password":"test2222"
        }
    )
    token_b = login_b.json()["access_token"]
    assert login_b.status_code == 200

    user_b_create_todo = client.post(
        "/todos",
        json={
            "title":"by user b",
            "description":"created by user b"
        },
        headers = {
            "Authorization" : f"Bearer {token_b}"
        }
    )

    assert user_b_create_todo.status_code == 201 

    response = client.get(
        "/todos/all" ,
        headers = {
            "Authorization" : f"Bearer {token_a}"
        }
    )

    todos = response.json()
    assert len(todos) == 1 
    assert todos[0]["title"] == "by user a"
    
