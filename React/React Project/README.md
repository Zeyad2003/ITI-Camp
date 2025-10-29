# React Dashboard Project

A modern React + TypeScript dashboard application with user management and intelligent note-taking features.

---

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Login Credentials

```
Username: admin
Password: admin123
```

---

## ✨ Features

### Core Functionality

- **👥 Users & Posts**
  - Browse users from JSONPlaceholder API
  - View detailed user profiles
  - Display user posts and to-do lists
  - Interactive to-do completion tracking

- **📝 Note Manager**
  - Create and manage personal notes
  - Priority-based organization (Important, Normal, Delayed)
  - Color-coded priority levels
  - Persistent local storage
  - Move notes between priority levels
  - Delete unwanted notes

- **🔐 Authentication**
  - Secure login system
  - Protected routes
  - Session management

---

## 📸 Screenshots

### Login Page
<img width="600" alt="Login Page" src="https://github.com/user-attachments/assets/1a57c725-ce3f-41cc-bbbc-5f5257766b88" />

### Dashboard Overview
<img width="800" alt="Dashboard Overview" src="https://github.com/user-attachments/assets/4f768ad2-9861-4caa-bd1d-f6cc33947ce8" />

### Note Manager Card
<img width="600" alt="Note Manager Card" src="https://github.com/user-attachments/assets/8ee05937-0963-4c33-97dd-f4204788b2c4" />

### User Detail Page
<img width="800" alt="User Detail Page" src="https://github.com/user-attachments/assets/b2c7b8cb-e197-44af-9f32-041588340fe3" />

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **React Router** | Client-side Routing |
| **TanStack Query** | Data Fetching & Caching |
| **TailwindCSS** | Styling Framework |
| **Lucide React** | Icon Library |


---

## 📁 Project Structure

```
src/
├── components/
│   ├── NoteManagerCard.tsx      # Note management component
│   └── UserPostsCard.tsx        # User list component
├── contexts/
│   ├── AuthContext.tsx          # Authentication state
│   ├── NotesContext.tsx         # Notes state management
│   └── TodosContext.tsx         # To-do state management
├── pages/
│   ├── Dashboard.tsx            # Main dashboard page
│   ├── Login.tsx                # Login page
│   └── UserDetail.tsx           # User detail view
├── types/
│   └── api.ts                   # TypeScript type definitions
├── App.tsx                      # App root component
└── main.tsx                     # Application entry point
```

---

## 🎯 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

