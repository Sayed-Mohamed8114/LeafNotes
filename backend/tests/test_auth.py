# first test that the router itself work
def test_docs_endpoint(client):
    response = client.get("/docs")
    assert response.status_code ==200 

def test_register_user(client):
    response = client.post("/auth/register", json = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "test1234"
        }
    )
    assert response.status_code == 201 

def test_register_duplicate_email(client):
    first_response = client.post("/auth/register", json = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "test1234"
    })
    assert first_response.status_code == 201 

    second_response = client.post("/auth/register",json={
        "name": "New User",
        "email": "test@example.com",
        "password": "test1111"
    })

    assert second_response.status_code == 409 

def test_login_user(client):
    is_registered= client.post("/auth/register" , json ={
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
    data = is_login.json()
    assert "access_token" in data 
    assert "token_type" in data 
    assert data["token_type"] == "bearer"
    assert len(data["access_token"]) > 0

def test_login_user_wrong_password(client):
    is_registered= client.post("/auth/register" , json ={
        "name": "sayed",
        "email": "sayed@example.com",
        "password": "test1111"
    })

    assert is_registered.status_code == 201 
    is_login = client.post("/auth/login",json={
        "email":"sayed@example.com",
        "password":"test1123"
    })
    assert is_login.status_code == 401

def test_login_user_wrong_email(client):
    is_registered= client.post("/auth/register" , json ={
            "name": "sayed",
            "email": "sayed@example.com",
            "password": "test1111"
        })
    
    assert is_registered.status_code == 201 
    is_login = client.post("/auth/login",json={
            "email":"sayed123@example.com",
            "password":"test1111"
        })
    assert is_login.status_code == 401