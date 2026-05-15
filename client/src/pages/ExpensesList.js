import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ExpensesList() {
 const token = localStorage.getItem("token");
 const [expenses, setExpenses] = useState([]);
 const [search, setSearch] = useState("");
 const [categoryFilter, setCategoryFilter] = useState("");
 useEffect(() => {
   fetchExpenses();
 }, []);
 const fetchExpenses = async () => {
   try {
     const response = await axios.get("http://localhost:5000/api/expenses", {
       headers: {
         Authorization: token
       }
     });
     setExpenses(response.data);
   } catch (error) {
     console.log(error);
   }
 };
 const deleteExpense = async (id) => {
   const confirmDelete = window.confirm(
     "Are you sure you want to delete this expense?"
   );
   if (!confirmDelete) return;
   try {
     await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
       headers: {
         Authorization: token
       }
     });
     fetchExpenses();
   } catch (error) {
     console.log(error);
   }
 };
 const filteredExpenses = expenses.filter((expense) => {
   const title = expense.title || "";
   const category = expense.category || "";
   const matchesSearch = title
     .toLowerCase()
     .includes(search.toLowerCase().trim());
   const matchesCategory =
     categoryFilter === "" || category === categoryFilter;
   return matchesSearch && matchesCategory;
 });
 const totalExpenses = filteredExpenses.reduce(
   (total, expense) => total + Number(expense.amount || 0),
   0
 );
 return (
<div className="container mt-4">
<div className="d-flex justify-content-between align-items-center mb-4">
<div>
<h2 className="mb-1">Expenses List</h2>
<p className="text-muted mb-0">
           Manage, search, filter, edit, and delete your expenses.
</p>
</div>
<Link to="/add-expense" className="btn btn-dark">
         + Add Expense
</Link>
</div>
<div className="card p-4 mb-4">
<div className="row">
<div className="col-md-6 mb-3 mb-md-0">
<label className="form-label fw-semibold">Search</label>
<input
             type="text"
             className="form-control"
             placeholder="Search by expense title..."
             value={search}
             onChange={(e) => setSearch(e.target.value)}
           />
</div>
<div className="col-md-6">
<label className="form-label fw-semibold">Category</label>
<select
             className="form-select"
             value={categoryFilter}
             onChange={(e) => setCategoryFilter(e.target.value)}
>
<option value="">All Categories</option>
<option value="Food">Food</option>
<option value="Transport">Transport</option>
<option value="Shopping">Shopping</option>
<option value="Bills">Bills</option>
</select>
</div>
</div>
</div>
<div className="card p-4">
<div className="d-flex justify-content-between align-items-center mb-3">
<h4 className="mb-0">Expenses Records</h4>
<span
           className="badge"
           style={{
             background: "#dbeafe",
             color: "#1d4ed8",
             fontSize: "14px",
             padding: "10px 14px",
             borderRadius: "999px"
           }}
>
           Total: {totalExpenses} OMR
</span>
</div>
<div className="table-responsive">
<table className="table align-middle">
<thead>
<tr>
<th>Title</th>
<th>Amount</th>
<th>Category</th>
<th>Type</th>
<th>Recurring</th>
<th>Date</th>
<th className="text-center">Action</th>
</tr>
</thead>
<tbody>
             {filteredExpenses.map((expense) => (
<tr key={expense._id}>
<td>{expense.title}</td>
<td>
<span
                     className="badge"
                     style={{
                       background: "#dcfce7",
                       color: "#166534",
                       fontSize: "13px",
                       padding: "8px 12px",
                       borderRadius: "999px"
                     }}
>
                     {expense.amount} OMR
</span>
</td>
<td>
<span
                     className="badge"
                     style={{
                       background: "#eef2ff",
                       color: "#3730a3",
                       fontSize: "13px",
                       padding: "8px 12px",
                       borderRadius: "999px"
                     }}
>
                     {expense.category}
</span>
</td>
<td>{expense.type}</td>
<td>
                   {expense.recurring ? (
<span className="badge bg-success">Yes</span>
                   ) : (
<span className="badge bg-secondary">No</span>
                   )}
</td>
<td>{expense.date ? expense.date.substring(0, 10) : ""}</td>
<td className="text-center">
<Link
                     to={`/edit-expense/${expense._id}`}
                     className="btn btn-warning btn-sm me-2"
>
                     Edit
</Link>
<button
                     className="btn btn-danger btn-sm"
                     onClick={() => deleteExpense(expense._id)}
>
                     Delete
</button>
</td>
</tr>
             ))}
</tbody>
</table>
</div>
       {filteredExpenses.length === 0 && (
<div className="alert alert-warning mt-3 mb-0">
           No expenses found.
</div>
       )}
</div>
</div>
 );
}
export default ExpensesList;