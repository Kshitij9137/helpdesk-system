# Helpdesk System

A full-stack helpdesk / ticketing system built with **Django REST Framework** and **React**.  
It supports role-based access (Admin, Agent, User), ticket lifecycle management, a searchable knowledge base, and an analytics dashboard.

---

## Features

### Authentication & Users
- JWT-based authentication (access + refresh tokens)
- Role-based access control: `admin`, `agent`, `user`
- User registration, login, logout, and profile management
- Optional profile pictures

### Ticket Management
- Create, view, update, and delete support tickets
- Status workflow: `open` → `in_progress` → `resolved` → `closed`
- Priority levels: `low`, `medium`, `high`, `critical`
- Automatic assignment of creator
- Admin can assign tickets to agents
- Role-aware visibility (users see only their own tickets)

### Knowledge Base
- FAQ management with categories and tags
- Full-text search across questions, answers, and tags
- Public read access; admin-only write access

### Analytics Dashboard
- Ticket summary (total / open / in-progress / resolved / closed)
- Daily & weekly ticket trends
- Average resolution time
- Agent performance metrics

---

## Tech Stack

| Layer      | Technology                                      |
|------------|--------------------------------------------------|
| Backend    | Django 5.2, Django REST Framework, SimpleJWT     |
| Frontend   | React 19, React Router 7, Axios, Chart.js        |
| Styling    | Tailwind CSS                                     |
| Database   | SQLite (default)                                 |
| Auth       | JWT (Bearer tokens)                              |

---

## Project Structure

helpdesk-system/
├── backend/                  # Django project
│   ├── helpdesk/             # Project settings & URLs
│   ├── users/                # Custom User model + auth
│   ├── tickets/              # Ticket models & APIs
│   ├── knowledge_base/       # FAQs & Categories
│   ├── analytics/            # Dashboard endpoints
│   ├── media/                # Uploaded profile pictures
│   ├── manage.py
│   └── requirements.txt
├── frontend/                 # React (Create React App)
│   ├── src/
│   │   ├── api/              # Axios instance + mocks
│   │   ├── components/       # Layout, Navbar, Sidebar, etc.
│   │   ├── context/          # AuthContext
│   │   ├── pages/            # Login, Tickets, FAQ, Dashboard
│   │   └── ...
│   ├── package.json
│   └── ...
└── requirements.txt          # Root dependencies (optional)
