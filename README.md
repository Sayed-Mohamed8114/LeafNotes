# 🍃 Leaf Notes

> A production-oriented full-stack task management application built from scratch to explore modern web application architecture, backend engineering, authentication, database design, testing, and deployment.

**Leaf Notes** is a full-stack task management application designed and developed from the ground up with a strong focus on **software engineering principles, clean architecture, security, maintainability, and scalability**.

The project is not intended to be just another Todo application.

It is a learning-driven engineering project where every feature is designed to answer an important question:

> **How do we build a real-world web application properly from the ground up?**

---

#  Overview

**Leaf Notes** is a modern task management platform where users can create, organize, track, and manage their personal tasks.

The application will provide a complete user experience from account creation to task management while maintaining a clear separation between:

* Presentation
* Business logic
* Data access
* Database
* Authentication
* Infrastructure

The project follows an incremental development approach.

Instead of implementing everything at once, each layer will be introduced, tested, reviewed, and improved before moving to the next stage.

---

#  Project Goals

The primary goal of Leaf Notes is to gain practical experience building a complete full-stack application.

The project focuses on:

* Understanding modern backend architecture
* Building RESTful APIs with FastAPI
* Designing relational databases
* Working with PostgreSQL
* Using SQLAlchemy effectively
* Managing database migrations with Alembic
* Implementing secure authentication
* Understanding JWT-based authentication
* Implementing authorization and ownership
* Building a scalable React frontend
* Integrating frontend and backend APIs
* Writing automated tests
* Handling errors consistently
* Applying security best practices
* Managing environment configuration
* Deploying a real application

The project will also serve as a practical portfolio project demonstrating full-stack development capabilities.

---

#  Core Features

The initial application will support the following functionality.

###  User Management

* User registration
* User login
* Secure password hashing
* JWT authentication
* Current user information
* Logout
* Protected resources
* User-specific data

###  Task Management

Users will be able to:

* Create tasks
* View tasks
* View a specific task
* Update tasks
* Delete tasks
* Mark tasks as completed
* Track task creation dates

###  Task Discovery

Users will eventually be able to:

* Search tasks
* Filter tasks
* Sort tasks
* Paginate task results

---

# Planned Features

The application will progressively evolve beyond basic CRUD functionality.

## Task Management

* [ ] Create task
* [ ] Edit task
* [ ] Delete task
* [ ] Complete task
* [ ] Reopen task
* [ ] Task details
* [ ] Task status
* [ ] Task priority
* [ ] Due dates
* [ ] Search
* [ ] Filtering
* [ ] Sorting
* [ ] Pagination

## User Management

* [ ] Registration
* [ ] Login
* [ ] Logout
* [ ] Current user
* [ ] Password hashing
* [ ] JWT authentication
* [ ] Protected routes
* [ ] Authorization
* [ ] User-owned tasks

## Frontend

* [ ] Responsive layout
* [ ] Authentication pages
* [ ] Dashboard
* [ ] Task list
* [ ] Task form
* [ ] Task details
* [ ] Loading states
* [ ] Error states
* [ ] Empty states
* [ ] Form validation
* [ ] Protected routes

## Backend

* [ ] REST API
* [ ] Pydantic validation
* [ ] Service layer
* [ ] Repository layer
* [ ] Dependency injection
* [ ] Centralized error handling
* [ ] Database migrations
* [ ] Authentication dependencies
* [ ] Authorization rules
* [ ] Automated tests
* [ ] API documentation

---

# 🛠 Technology Stack

## Frontend

| Technology   | Purpose                       |
| ------------ | ----------------------------- |
| React        | User interface                |
| TypeScript   | Static typing                 |
| Vite         | Development and build tooling |
| React Router | Client-side routing           |
| Axios        | HTTP communication            |
| Tailwind CSS | Styling                       |

---

## Backend

| Technology | Purpose                      |
| ---------- | ---------------------------- |
| Python     | Backend programming language |
| FastAPI    | REST API framework           |
| Pydantic   | Data validation and schemas  |
| SQLAlchemy | ORM and database interaction |
| Alembic    | Database migrations          |
| PostgreSQL | Relational database          |
| JWT        | Authentication               |
| Pytest     | Automated testing            |

---

# 🏗 System Architecture

Leaf Notes will follow a layered architecture.

```text
                         ┌──────────────────────┐
                         │       Browser        │
                         └──────────┬───────────┘
                                    │
                                    │ HTTPS
                                    ▼
                         ┌──────────────────────┐
                         │   React Frontend     │
                         │      TypeScript      │
                         └──────────┬───────────┘
                                    │
                                    │ HTTP / JSON
                                    ▼
                         ┌──────────────────────┐
                         │     FastAPI API      │
                         │       Routers        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Service Layer      │
                         │   Business Logic     │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Repository Layer     │
                         │   Data Access        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │      SQLAlchemy      │
                         │         ORM          │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     PostgreSQL       │
                         │      Database        │
                         └──────────────────────┘
```

The architecture is intentionally layered to maintain clear separation of responsibilities.

---

#  Project Structure

The repository uses a monorepo structure containing both the frontend and backend applications.

```text
leaf-notes/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── context/
│   │   ├── utils/
│   │   └── routes/
│   │
│   ├── .env.example
│   └── package.json
│
├── backend/
│   │
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   ├── services/
│   │   ├── repositories/
│   │   └── dependencies/
│   │
│   ├── tests/
│   ├── alembic/
│   ├── .env.example
│   ├── alembic.ini
│   └── requirements.txt
│
├── .gitignore
├── README.md
└── LICENSE
```

The structure may evolve during development as architectural requirements become clearer.

---

#  Application Flow

A typical task request will follow this flow:

```text
User
 │
 ▼
React Component
 │
 ▼
API Service
 │
 ▼
Axios
 │
 ▼
FastAPI Router
 │
 ▼
Authentication / Dependencies
 │
 ▼
Service Layer
 │
 ▼
Repository Layer
 │
 ▼
SQLAlchemy
 │
 ▼
PostgreSQL
 │
 ▼
Response
 │
 ▼
Pydantic Schema
 │
 ▼
FastAPI
 │
 ▼
Axios
 │
 ▼
React
```

Each layer has a specific responsibility.

---

#  Authentication & Authorization

Authentication will be implemented using JWT-based authentication.

The authentication flow will be:

```text
Register
   │
   ▼
Hash Password
   │
   ▼
Store User
   │
   ▼
Login
   │
   ▼
Verify Password
   │
   ▼
Generate JWT
   │
   ▼
Client
   │
   ▼
Authenticated Requests
   │
   ▼
Verify JWT
   │
   ▼
Identify Current User
```

### Authentication

Authentication answers:

> Who is this user?

### Authorization

Authorization answers:

> Is this user allowed to access this resource?

For example:

```text
User A
   │
   ├── Todo 1
   ├── Todo 2
   └── Todo 3

User B
   │
   ├── Todo 4
   └── Todo 5
```

User A must never be able to modify User B's tasks.

Ownership checks will therefore be enforced on protected resources.

---

# 🗄 Database Design

The initial database will contain a relationship between users and tasks.

```text
┌───────────────┐
│     users     │
├───────────────┤
│ id            │
│ username      │
│ email         │
│ password_hash │
│ created_at    │
└───────┬───────┘
        │
        │ 1
        │
        │ N
        ▼
┌───────────────┐
│     todos     │
├───────────────┤
│ id            │
│ title         │
│ description   │
│ completed     │
│ priority      │
│ due_date      │
│ user_id       │
│ created_at    │
│ updated_at    │
└───────────────┘
```

The schema will evolve as new functionality is introduced.

Database changes will be managed using **Alembic migrations**.

---

#  API Design

The backend will expose a RESTful API.

## Authentication

```http
POST /auth/register
POST /auth/login
GET  /auth/me
```

## Todos

```http
GET    /todos
GET    /todos/{id}
POST   /todos
PUT    /todos/{id}
DELETE /todos/{id}
```

Additional query parameters will eventually support:

```http
GET /todos?search=fastapi
GET /todos?status=completed
GET /todos?priority=high
GET /todos?sort=created_at
GET /todos?page=1&limit=10
```

The API will use appropriate HTTP status codes and structured JSON responses.

---

# Validation & Error Handling

Input validation will be handled using **Pydantic**.

The API will provide appropriate responses for common failure scenarios.

| Status | Meaning                            |
| ------ | ---------------------------------- |
| `200`  | Successful request                 |
| `201`  | Resource created                   |
| `204`  | Successful request with no content |
| `400`  | Bad request                        |
| `401`  | Authentication required            |
| `403`  | Forbidden                          |
| `404`  | Resource not found                 |
| `422`  | Validation error                   |
| `500`  | Internal server error              |

Error handling will be designed to provide useful information to the client without exposing sensitive implementation details.

---

#  Testing Strategy

Testing will be introduced progressively.

The backend will use **Pytest**.

Tests will cover:

### Authentication

* Registration
* Duplicate accounts
* Login
* Invalid credentials
* Token validation
* Protected endpoints

### Todos

* Create todo
* Retrieve todos
* Retrieve a single todo
* Update todo
* Delete todo
* Invalid todo ID
* Unauthorized access
* User ownership

### Integration

The application will eventually include tests covering interactions between:

```text
API
 ↓
Service
 ↓
Database
```

The goal is not simply to achieve high test coverage, but to verify important application behavior.

---

#  Security

Security is treated as a fundamental part of the application rather than a final step.

The project will address:

* Password hashing
* JWT validation
* Authentication
* Authorization
* User ownership
* Environment variables
* Secret management
* CORS configuration
* Input validation
* SQL injection prevention through ORM usage
* Secure error handling
* Production configuration
* HTTPS deployment

Sensitive credentials will never be committed to the repository.

---

#  Development Principles

Leaf Notes will follow several engineering principles throughout development.

### Separation of Concerns

Each component and backend layer should have a clear responsibility.

### DRY

Avoid unnecessary duplication while avoiding premature abstraction.

### KISS

Prefer simple solutions when complexity is not justified.

### Explicit Over Clever

Readable code is more valuable than unnecessarily clever code.

### Security by Design

Security should be considered while designing features, not added only at the end.

### Incremental Development

Each phase should produce a working and understandable system.

### Understand Before Abstracting

Abstractions will be introduced when they solve a real problem rather than simply because they are considered "professional".

### Test Important Behavior

Tests should protect important application behavior and business rules.

---

#  Environment Variables

Environment variables will be used for configuration and secrets.

Example backend configuration:

```env
DATABASE_URL=
SECRET_KEY=
ACCESS_TOKEN_EXPIRE_MINUTES=
```

Example frontend configuration:

```env
VITE_API_URL=
```

Actual `.env` files must never be committed.

Use `.env.example` files to document required configuration.

---

#  Local Development

Clone the repository:

```bash
git clone <repository-url>
cd leaf-notes
```

The frontend and backend will be configured independently.

### Backend

Create a virtual environment:

```bash
cd backend

python -m venv .venv
```

Activate it:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the development server:

```bash
uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

#  Git Workflow

Development will follow a structured Git workflow.

Feature branches should be used instead of directly committing every change to the main branch.

Example:

```text
main
 │
 ├── feature/authentication
 ├── feature/todo-crud
 ├── feature/search
 └── feature/testing
```

Commit messages should clearly describe the change.

Examples:

```text
feat: add todo creation endpoint
feat: implement JWT authentication
fix: prevent unauthorized todo access
refactor: move database logic to repository
test: add authentication tests
docs: update API documentation
```

---

#  Deployment

The final application will be deployed as a real production-style system.

Target architecture:

```text
                  Internet
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
      Frontend               Backend
       React                 FastAPI
          │                     │
          │                     │
          │              ┌──────▼──────┐
          │              │ PostgreSQL  │
          │              └─────────────┘
          │
          └──────── HTTPS ────────┘
```

Deployment providers may change during development depending on requirements and available infrastructure.

---

#  Future Improvements

After the core system is stable, possible improvements include:

* Refresh tokens
* Password reset
* Email verification
* User profile
* Task categories
* Tags
* Recurring tasks
* Task attachments
* Notifications
* Activity history
* Dark mode
* Drag-and-drop task management
* Real-time updates
* WebSockets
* Background tasks
* Redis caching
* Rate limiting
* Advanced analytics
* Docker
* CI/CD
* Monitoring
* Observability

These features are intentionally excluded from the initial implementation to avoid premature complexity.

---

# Learning Objectives

By completing Leaf Notes, the goal is to gain practical understanding of:

### Backend Engineering

* Python
* FastAPI
* REST APIs
* HTTP
* Pydantic
* Dependency Injection
* SQLAlchemy
* PostgreSQL
* Database relationships
* Transactions
* Alembic
* Authentication
* Authorization
* JWT
* Error handling
* Testing

### Frontend Engineering

* React
* TypeScript
* Component architecture
* State management
* Routing
* API integration
* Authentication flows
* Form handling
* Error handling
* Responsive UI

### Software Engineering

* Layered architecture
* Separation of concerns
* Clean code
* Git
* Testing
* Security
* Environment configuration
* Deployment
* Documentation
* Maintainability

---

#  Author

**Sayed Mohamed**

GitHub: [Sayed-Mohamed8114](https://github.com/Sayed-Mohamed8114)

---