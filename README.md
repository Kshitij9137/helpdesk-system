# Helpdesk System

A full-stack helpdesk and ticketing system built with **Django REST Framework** and **React**.

It supports role-based access control (Admin, Agent, User), ticket lifecycle management, a searchable knowledge base, and an analytics dashboard.

---

## Features

### Authentication & Users

- JWT-based authentication (access + refresh tokens)
- Role-based access control:
  - `admin`
  - `agent`
  - `user`
- User registration, login, logout, and profile management
- Optional profile pictures

### Ticket Management

- Create, view, update, and delete support tickets
- Ticket status workflow:
  - `open`
  - `in_progress`
  - `resolved`
  - `closed`
- Priority levels:
  - `low`
  - `medium`
  - `high`
  - `critical`
- Automatic assignment of the ticket creator
- Admins can assign tickets to agents
- Role-aware ticket visibility
  - Users can only see their own tickets

### Knowledge Base

- FAQ management with categories and tags
- Full-text search across:
  - Questions
  - Answers
  - Tags
- Public read access
- Admin-only write access

### Analytics Dashboard

- Ticket summary:
  - Total
  - Open
  - In progress
  - Resolved
  - Closed
- Daily and weekly ticket trends
- Average resolution time
- Agent performance metrics

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Django 5.2, Django REST Framework, SimpleJWT |
| Frontend | React 19, React Router 7, Axios, Chart.js |
| Styling | Tailwind CSS |
| Database | SQLite (default) |
| Authentication | JWT (Bearer tokens) |

---

## Project Structure

```text
helpdesk-system/
├── backend/
│   ├── helpdesk/                 # Project settings & root URLs
│   ├── users/                    # Custom User model + Auth
│   ├── tickets/                  # Ticket models & APIs
│   ├── knowledge_base/           # FAQs & Categories
│   ├── analytics/                # Dashboard endpoints
│   ├── media/                    # Uploaded profile pictures
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/                  # Axios instance + mock data
│   │   ├── components/           # Layout, Navbar, Sidebar, etc.
│   │   ├── context/              # AuthContext
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   ├── faq/
│   │   │   ├── CreateTicket.jsx
│   │   │   ├── EditTicket.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── TicketDetail.jsx
│   │   │   └── TicketList.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── .gitignore
└── requirements.txt
---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- npm or yarn

### 1. Backend Setup

```bash
cd backend

# Create and activate virtual environment (recommended)
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
# or use the root requirements.txt which also includes django-filter & pillow

# Apply migrations
python manage.py migrate

# Create a superuser (optional but useful)
python manage.py createsuperuser

# Run the development server
python manage.py runserver
```

Backend will be available at: **http://127.0.0.1:8000**

### 2. Frontend Setup

```bash
cd frontend

npm install
npm start
```

Frontend will open at: **http://localhost:3000**

> The frontend is pre-configured to talk to `http://127.0.0.1:8000/api`.

---

## API Overview

| Endpoint Group          | Base Path              | Description                          |
|-------------------------|------------------------|--------------------------------------|
| Authentication          | `/api/users/`          | Register, Login, Refresh, Logout, Profile |
| Tickets                 | `/api/tickets/`        | CRUD + Assign                        |
| Knowledge Base          | `/api/knowledge/`      | FAQs & Categories                    |
| Analytics               | `/api/analytics/`      | Summary, Trends, Resolution, Agents  |

### Example Auth Flow

```bash
# Register
POST /api/users/register/
{
  "username": "john",
  "email": "john@example.com",
  "password": "strongpassword",
  "password2": "strongpassword",
  "role": "user"
}

# Login
POST /api/users/login/
{
  "username": "john",
  "password": "strongpassword"
}
# → returns { "access": "...", "refresh": "..." }
```

Include the access token in subsequent requests:

```
Authorization: Bearer <access_token>
```

---

## Roles & Permissions

| Action                     | User | Agent | Admin |
|----------------------------|------|-------|-------|
| Create / view own tickets  | ✅   | ✅    | ✅    |
| View all tickets           | ❌   | ✅    | ✅    |
| Assign tickets             | ❌   | ❌    | ✅    |
| Manage FAQs & Categories   | ❌   | ❌    | ✅    |
| View analytics             | ❌   | ✅*   | ✅    |

\* Some analytics endpoints are currently open to authenticated users; tighten as needed.

---

## Environment Notes

- **CORS** is set to allow all origins in development (`CORS_ALLOW_ALL_ORIGINS = True`). Restrict this in production.
- **SECRET_KEY** is currently hard-coded. Move it to environment variables for production.
- Media files (profile pictures) are served from `/media/` in development.

---

## Future Improvements

- Proper permission classes on all analytics endpoints
- Email notifications on ticket assignment / status change
- File attachments on tickets
- Advanced filtering & pagination
- Production-ready deployment (Docker, environment variables, PostgreSQL)

---



Made with ❤️ using Django & React
```
