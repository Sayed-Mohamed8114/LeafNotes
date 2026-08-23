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
    
def test_get_todo_by_id(client):
    user = client.post(
        "/auth/register",
        json={
            "name": "sayed",
            "email": "gettodo@example.com",
            "password": "test1111"
        }
    )

    assert user.status_code == 201

    login = client.post(
        "/auth/login",
        json={
            "email": "gettodo@example.com",
            "password": "test1111"
        }
    )

    assert login.status_code == 200

    token = login.json()["access_token"]

    todo_response = client.post(
        "/todos",
        json={
            "title": "Learn FastAPI",
            "description": "Get todo by id"
        },
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert todo_response.status_code == 201 

    todo_id = todo_response.json()["id"]
    response = client.get(
        f"/todos/{todo_id}",
        headers={
            "Authorization":f"Bearer {token}"
        }
    )

    assert response.status_code == 200 
    data = response.json()
    assert data["id"] == todo_id 
    assert data["title"] == "Learn FastAPI"
    assert data["description"] == "Get todo by id"

def test_get_nonexistent_todo(client):
    user = client.post(
        "/auth/register",
        json={
            "name": "sayed",
            "email": "nonexistent@example.com",
            "password": "test1111"
        }
    )

    assert user.status_code == 201

    login = client.post(
        "/auth/login",
        json={
            "email": "nonexistent@example.com",
            "password": "test1111"
        }
    )

    assert login.status_code == 200

    token = login.json()["access_token"]
    response = client.get(
        "/todos/999999",
        headers={
            "Authorization":f"Bearer {token}"
        }
    )
    assert response.status_code == 404 
    assert response.json()["detail"] == "Todo not found"

def test_user_cannot_get_another_user_todo(client):
    user_a = client.post(
        "/auth/register",
        json={
            "name": "User A",
            "email": "usera_get@example.com",
            "password": "test1111"
        }
    )

    assert user_a.status_code == 201

    login_a = client.post(
        "/auth/login",
        json={
            "email": "usera_get@example.com",
            "password": "test1111"
        }
    )

    assert login_a.status_code == 200

    token_a = login_a.json()["access_token"]

    todo_response = client.post(
        "/todos",
        json={
            "title": "Private Todo",
            "description": "This belongs to User A"
        },
        headers={
            "Authorization": f"Bearer {token_a}"
        }
    )

    assert todo_response.status_code == 201

    todo_id = todo_response.json()["id"]

    user_b = client.post(
        "/auth/register",
        json={
            "name": "User B",
            "email": "userb_get@example.com",
            "password": "test2222"
        }
    )

    assert user_b.status_code == 201

    login_b = client.post(
        "/auth/login",
        json={
            "email": "userb_get@example.com",
            "password": "test2222"
        }
    )

    assert login_b.status_code == 200

    token_b = login_b.json()["access_token"]

    response = client.get(
        f"/todos/{todo_id}",
        headers={
            "Authorization": f"Bearer {token_b}"
        }
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"

def test_update_todo(client):
    user = client.post(
        "/auth/register",
        json={
            "name": "sayed",
            "email": "update@example.com",
            "password": "test1111"
        }
    )

    assert user.status_code == 201

    login = client.post(
        "/auth/login",
        json={
            "email": "update@example.com",
            "password": "test1111"
        }
    )

    assert login.status_code == 200

    token = login.json()["access_token"]
    todo_response = client.post(
        "/todos",
        json={
            "title": "Old Title",
            "description": "Old Description"
        },
        headers={
            "Authorization": f"Bearer {token}"
        }
    )
    assert todo_response.status_code == 201
    todo_id = todo_response.json()["id"]
    response = client.patch(
        f"/todos/{todo_id}",
        json={
            "title":"New Title",
            "completed":True
        },
        headers={
            "Authorization": f"Bearer {token}"
        }
    )
    assert response.status_code == 200 
    data = response.json()
    assert data["id"] == todo_id
    assert data["title"] == "New Title"
    assert data["description"] == "Old Description"
    assert data["completed"] is True

def test_update_nonexistent_todo(client):
    user = client.post(
        "/auth/register",
        json={
            "name": "sayed",
            "email": "update404@example.com",
            "password": "test1111"
        }
    )

    assert user.status_code == 201

    login = client.post(
        "/auth/login",
        json={
            "email": "update404@example.com",
            "password": "test1111"
        }
    )

    assert login.status_code == 200

    token = login.json()["access_token"]

    response = client.patch(
        "/todos/999999",
        json={
            "title": "Trying to update"
        },
        headers={
            "Authorization": f"Bearer {token}"
        }
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"

def test_user_cannot_update_another_user_todo(client):
    user_a = client.post(
        "/auth/register",
        json={
            "name": "User A",
            "email": "updateusera@example.com",
            "password": "test1111"
        }
    )

    assert user_a.status_code == 201

    login_a = client.post(
        "/auth/login",
        json={
            "email": "updateusera@example.com",
            "password": "test1111"
        }
    )

    assert login_a.status_code == 200

    token_a = login_a.json()["access_token"]

    todo_response = client.post(
        "/todos",
        json={
            "title": "User A Todo",
            "description": "Private Todo"
        },
        headers={
            "Authorization": f"Bearer {token_a}"
        }
    )

    assert todo_response.status_code == 201

    todo_id = todo_response.json()["id"]

    user_b = client.post(
        "/auth/register",
        json={
            "name": "User B",
            "email": "updateuserb@example.com",
            "password": "test2222"
        }
    )

    assert user_b.status_code == 201

    login_b = client.post(
        "/auth/login",
        json={
            "email": "updateuserb@example.com",
            "password": "test2222"
        }
    )

    assert login_b.status_code == 200

    token_b = login_b.json()["access_token"]

    response = client.patch(
        f"/todos/{todo_id}",
        json={
            "title": "Hacked Title"
        },
        headers={
            "Authorization": f"Bearer {token_b}"
        }
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"


def test_delete_todo(client):
    user = client.post(
        "/auth/register",
        json={
            "name": "delete user",
            "email": "delete@example.com",
            "password": "test1111"
        }
    )

    login = client.post(
        "/auth/login",
        json={
            "email": "delete@example.com",
            "password": "test1111"
        }
    )

    token = login.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}"
    }

    todo = client.post(
        "/todos/",
        json={
            "title": "Todo to delete",
            "description": "This todo will be deleted"
        },
        headers=headers
    )

    assert todo.status_code == 201

    todo_id = todo.json()["id"]

    response = client.delete(
        f"/todos/{todo_id}",
        headers=headers
    )

    assert response.status_code == 204


def test_delete_nonexistent_todo(client):
    user = client.post(
        "/auth/register",
        json={
            "name": "delete missing",
            "email": "deletemissing@example.com",
            "password": "test1111"
        }
    )

    login = client.post(
        "/auth/login",
        json={
            "email": "deletemissing@example.com",
            "password": "test1111"
        }
    )

    token = login.json()["access_token"]

    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = client.delete(
        "/todos/999999",
        headers=headers
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"


def test_user_cannot_delete_another_users_todo(client):
    user1 = client.post(
        "/auth/register",
        json={
            "name": "user one",
            "email": "userone@example.com",
            "password": "test1111"
        }
    )

    login1 = client.post(
        "/auth/login",
        json={
            "email": "userone@example.com",
            "password": "test1111"
        }
    )

    token1 = login1.json()["access_token"]

    headers1 = {
        "Authorization": f"Bearer {token1}"
    }

    todo = client.post(
        "/todos/",
        json={
            "title": "User 1 todo",
            "description": "This belongs to user 1"
        },
        headers=headers1
    )

    assert todo.status_code == 201

    todo_id = todo.json()["id"]

    user2 = client.post(
        "/auth/register",
        json={
            "name": "user two",
            "email": "usertwo@example.com",
            "password": "test1111"
        }
    )

    login2 = client.post(
        "/auth/login",
        json={
            "email": "usertwo@example.com",
            "password": "test1111"
        }
    )

    token2 = login2.json()["access_token"]

    headers2 = {
        "Authorization": f"Bearer {token2}"
    }
    response = client.delete(
        f"/todos/{todo_id}",
        headers=headers2
    )

    assert response.status_code == 404
    assert response.json()["detail"] == "Todo not found"
