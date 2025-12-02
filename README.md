# G2G Auth Module

A simple authentication module built for the G2G front-end assessment.

This project demonstrates a fully functional auth flow using **Vue 3**, **TypeScript**, and **Pinia**, with browser `localStorage` simulating a backend database.

---

## Features

- **User Registration**
  - Multi-step form
  - Collects email, password, name, phone, address, age, and gender
- **Login**
  - Email + password authentication
- **Update Profile**
  - Edit profile details with password hashing
- **Forget Password**
  - Request reset link and set new password
- **Routing**
  - Proper page routing with `vue-router`
- **State Management**
  - Pinia store tracks user session and reactive state
- **Loading States**
  - Async operations display loading indicators

---

## Tech Stack

- **Frontend Framework:** Vue 3
- **Language:** TypeScript
- **State Management:** Pinia
- **Routing:** Vue Router
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Database Simulation:** Browser `localStorage`
- **Hashing:** SHA-256 (via `secureHash` function)
- **Unique IDs:** UUIDv4

---

## Project Structure

src/
├─ components/ # Reusable components (spinners)
├─ lib/ # Helpers ( emulate delay, hashing password, storage )
├─ pages/ # Page components (Login, Register, ResetPassword)
├─ services/ # Emulating API backend
├─ stores/ # Pinia stores
├─ types/ # TypeScript type definitions
└─ router.ts # Vue Router setup

---

## Setup

1. Clone the repo:

`git clone https://github.com/Suik0n/g2g-auth-module.git`

`cd g2g-auth-module`

2. Install dependencies:
   `npm install`

3. Start the development server:
   `npm run dev`

4. Open your browser at http://localhost:3000.

---

## Notes

    •	All user data is stored in browser localStorage.
    •	Passwords are hashed using SHA-256 before storing.
    •	Session is maintained via localStorage and cleared on logout.
    •	Reset Link are shown as alerts to copy paste
