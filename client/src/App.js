import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import ExpensesList from "./pages/ExpensesList";
import EditExpense from "./pages/EditExpense";
import Profile from "./pages/Profile";
import Reviews from "./pages/Reviews";
import Developers from "./pages/Developers";
import Navbar from "./pages/Navbar";
function ProtectedRoute({ children }) {
 const token = localStorage.getItem("token");
 if (!token) {
   return <Navigate to="/login" />;
 }
 return children;
}
function App() {
 const token = localStorage.getItem("token");
 return (
<BrowserRouter>
     {token && <Navbar />}
<div className="container mt-4">
<Routes>
<Route
           path="/login"
           element={token ? <Navigate to="/dashboard" /> : <Login />}
         />
<Route
           path="/register"
           element={token ? <Navigate to="/dashboard" /> : <Register />}
         />
<Route
           path="/dashboard"
           element={
<ProtectedRoute>
<Dashboard />
</ProtectedRoute>
           }
         />
<Route
           path="/add-expense"
           element={
<ProtectedRoute>
<AddExpense />
</ProtectedRoute>
           }
         />
<Route
           path="/expenses"
           element={
<ProtectedRoute>
<ExpensesList />
</ProtectedRoute>
           }
         />
<Route
           path="/edit-expense/:id"
           element={
<ProtectedRoute>
<EditExpense />
</ProtectedRoute>
           }
         />
<Route
           path="/profile"
           element={
<ProtectedRoute>
<Profile />
</ProtectedRoute>
           }
         />
<Route
           path="/reviews"
           element={
<ProtectedRoute>
<Reviews />
</ProtectedRoute>
           }
         />
<Route
           path="/developers"
           element={
<ProtectedRoute>
<Developers />
</ProtectedRoute>
           }
         />
<Route
           path="*"
           element={<Navigate to={token ? "/dashboard" : "/login"} />}
         />
</Routes>
</div>
</BrowserRouter>
 );
}
export default App;