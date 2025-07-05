# BrainXcel – Learning Management System (Frontend)

BrainXcel is a modern, responsive Learning Management System (LMS) frontend built with React, Redux, Vite, Tailwind CSS, and DaisyUI. Publicly deployed at [brainxcel.subhranil.vercel.app](http://brainxcel.subhranil.vercel.app/), it supports role-based access for students, teachers, and admins, and provides a seamless user experience for course management, enrollment, and learning.

---

## Table of Contents
- [BrainXcel – Learning Management System (Frontend)](#brainxcel--learning-management-system-frontend)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo)
  - [Features](#features)
  - [Screenshots](#screenshots)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Running Locally](#running-locally)
  - [Project Structure](#project-structure)
  - [Key Components \& Pages](#key-components--pages)
  - [State Management (Redux)](#state-management-redux)
  - [API Integration](#api-integration)
  - [Contributing](#contributing)
  - [License](#license)

---

## Demo
[Live Demo: BrainXcel](http://brainxcel.subhranil.vercel.app/)

Visit the live application to explore all features in action. This deployment demonstrates the full functionality of the LMS, including authentication, course management, dashboards, and more.

---

## Features
- **Role-based authentication:** Secure access for students, teachers, admins
- **Course management:** Create, edit, and view courses and lectures
- **User dashboard:** Profile, purchase history, and course progress
- **Payments:** Integrated checkout and feedback for success/failure
- **Responsive UI:** Built with Tailwind CSS and DaisyUI
- **Notifications:** Toasts and in-app feedback
- **Redux state management:** For authentication, user data, and courses
- **Reusable components:** Modular design for easy maintenance
- **Protected & Public Routes:** Fine-grained access control using React Router and custom `RequireAuth` component
- **Admin & Teacher Dashboards:** Dedicated views for privileged users
- **Guest Access:** Limited guest mode for exploring courses

---

## Screenshots
> _Add screenshots/GIFs of the homepage, dashboard, course list, etc._

---

## Tech Stack
- **Frontend:** React, Redux, Vite, Tailwind CSS, DaisyUI
- **Routing:** React Router
- **State Management:** Redux Toolkit
- **Notifications:** react-hot-toast
- **Analytics:** Vercel Analytics & Speed Insights

---

## Getting Started
### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```bash
git clone https://github.com/subhranil002/Learning-Management-System-Frontend.git
cd Learning-Management-System-Frontend
npm install
```

### Environment Variables
- Copy `.env.example` to `.env` and update with your API URLs and secrets.

### Running Locally
```bash
npm run dev
```
App runs at `http://localhost:5173`

---

## Project Structure
```
src/
  ├── App.jsx           # Main routing and authentication logic
  ├── main.jsx          # Entry point
  ├── index.css         # Global styles
  ├── Assets/           # Images and static assets
  ├── Components/       # Reusable UI components (Auth, CarouselSlide, CourseCard, etc.)
  │     └── Auth/       # Authentication wrappers (e.g., RequireAuth)
  ├── Constants/        # App-wide constants (e.g., celebrity data)
  ├── Helpers/          # Utility functions (e.g., axios instance)
  ├── Layouts/          # Shared layouts (e.g., HomeLayout)
  ├── Pages/            # Main page components (AboutUs, Contact, HomePage, SignIn, etc.)
  │    ├── Course/      # Course-related pages (Create, Edit, Description, Lectures)
  │    ├── User/        # User profile, edit, purchase history, etc.
  │    ├── Admin/       # Admin dashboard
  │    ├── Teacher/     # Teacher dashboard
  │    └── Payment/     # Payment/checkout pages
  └── Redux/            # Redux slices and store (AuthSlice, CourseSlice, etc.)
```

---

## Key Components & Pages
- **Components:**  
  - `Header`, `Footer`, `CourseCard`, `CarouselSlide`, `VideoPlayer`, `Search`, `RequireAuth` (for route protection)
- **Pages:**  
  - `HomePage`, `AboutUs`, `Contact`, `SignIn`, `SignUp`, `Profile`, `AdminDashboard`, `TeacherDashboard`, `CourseList`, `CourseDescription`, `Checkout`, etc.
- **Layouts:**  
  - `HomeLayout` for consistent page structure

---

## State Management (Redux)
- **Slices:**  
  - `AuthSlice`: Handles authentication, user profile, login/logout, registration, password reset, etc.
  - Additional slices for courses, payments, etc.
- **Store:**  
  - Centralized Redux store in `Redux/store.js`.
- **Persistence:**  
  - Session storage for user authentication state.

---

## API Integration
- Uses a helper (`Helpers/axiosInstance.js`) for API requests.
- Integrates with backend endpoints for authentication, courses, payments, and user management.
- Handles API errors with user-friendly toast notifications.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
This project is licensed under the [GNU General Public License v3.0 (GPLv3)](LICENSE).
<br/><br/><br/>
<p align="center">Made With ❤️</p>