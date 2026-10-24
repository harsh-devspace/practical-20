# Practical 20: Complete CRUD Application

## Objective
Develop a simple **Employee Management System** using React that performs **Create, Read, Update, and Delete (CRUD)** operations and demonstrates components, state, props, event handling, conditional rendering, list rendering, forms, and API integration.

## React Concepts Demonstrated
1. **Components**: Modular hierarchy (`Header`, `EmployeeGrid`, `EmployeeTable`, `EmployeeModal`, `Toast`).
2. **State**: Reactive data managed with `useState()` (employees, search, filters, modal state).
3. **Props**: Unidirectional data flow passed between parent and child components.
4. **Event Handling**: `onSubmit`, `onClick`, `onChange`, and confirm modals.
5. **Conditional Rendering**: Toggling between Grid and Table views, Create vs Edit modal titles, and empty states.
6. **List Rendering**: Dynamic employee card/table rendering using `.map()` with unique `key={emp.id}`.
7. **Forms**: Controlled input forms with live validation for adding and updating employees.
8. **API Integration & Persistence**: Simulated database service utilizing `localStorage` and JSON synchronization.

## Project Structure
```
Practical_20/
├── src/
│   ├── App.jsx            # Complete Employee Management CRUD Dashboard
│   ├── main.jsx           # React DOM root entry
│   └── index.css          # Tailwind CSS styles
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel configuration
└── README.md              # Project documentation
```

## Installation & Running Steps
1. Navigate to the project directory:
   ```bash
   cd Practical_20
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.
