# Issue Tracker - Frontend

Frontend for the Issue Tracker application built using React, TypeScript, Vite, Tailwind CSS, and Axios.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Icons
- React Toastify

## Prerequisites

- Node.js (v18 or above)
- npm

## Installation

```bash
git clone <frontend-repository-url>
cd frontend
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_URL=http://localhost:5000/api
```

## Run the Application

```bash
npm run dev
```

The application will start on:

```
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Features

- User Registration
- User Login
- Dashboard
- View Issues
- Create Issue
- Edit Issue
- Delete Issue
- Assign Issues
- Status Tracking
- Comments
- Protected Routes

## Folder Structure

```
src/
 ├── api/
 ├── components/
 ├── context/
 ├── hooks/
 ├── pages/
 ├── types/
 ├── App.tsx
 └── main.tsx
```

## Backend Repository

Update the API URL in `.env` to point to your backend server.
