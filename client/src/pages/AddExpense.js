import React, { useState } from "react";
import axios from "axios";
function AddExpense() {
 const token = localStorage.getItem("token");
 const [title, setTitle] = useState("");
 const [amount, setAmount] = useState("");
 const [category, setCategory] = useState("");
 const [type, setType] = useState("");
 const [recurring, setRecurring] = useState(false);
 const [date, setDate] = useState("");
 const handleSubmit = async (e) => {
   e.preventDefault();
   if (!token) {
     alert("Please login first");
     return;
   }
   try {
     await axios.post(
       "http://localhost:5000/api/expenses",
       {
         title,
         amount,
         category,
         type,
         recurring,
         date
       },
       {
         headers: {
           Authorization: token
         }
       }
     );
     alert("Expense added successfully");
     setTitle("");
     setAmount("");
     setCategory("");
     setType("");
     setRecurring(false);
     setDate("");
   } catch (error) {
     console.log(error);
     alert("Error adding expense");
   }
 };
 return (
<div className="container mt-4">
<div className="mb-4">
<h2>Add New Expense</h2>
<p className="text-muted">
         Record your spending details and keep your budget organized.
</p>
</div>
<div className="row justify-content-center">
<div className="col-lg-8">
<div className="card p-4">
<form onSubmit={handleSubmit}>
<div className="row">
<div className="col-md-6 mb-3">
<label className="form-label fw-semibold">
                   Expense Title
</label>
<input
                   type="text"
                   className="form-control"
                   placeholder="Example: Electricity bill"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   required
                 />
</div>
<div className="col-md-6 mb-3">
<label className="form-label fw-semibold">
                   Amount OMR
</label>
<input
                   type="number"
                   className="form-control"
                   placeholder="Example: 25"
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   required
                 />
</div>
</div>
<div className="row">
<div className="col-md-6 mb-3">
<label className="form-label fw-semibold">
                   Category
</label>
<select
                   className="form-select"
                   value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   required
>
<option value="">Select Category</option>
<option value="Food">Food</option>
<option value="Transport">Transport</option>
<option value="Shopping">Shopping</option>
<option value="Bills">Bills</option>
</select>
</div>
<div className="col-md-6 mb-3">
<label className="form-label fw-semibold">
                   Expense Date
</label>
<input
                   type="date"
                   className="form-control"
                   value={date}
                   onChange={(e) => setDate(e.target.value)}
                   required
                 />
</div>
</div>
<div className="mb-4">
<label className="form-label fw-semibold d-block">
                 Expense Type
</label>
<div className="d-flex gap-3 flex-wrap">
<label
                   className="p-3 rounded-4 border bg-white"
                   style={{ cursor: "pointer", minWidth: "180px" }}
>
<input
                     type="radio"
                     className="form-check-input me-2"
                     name="type"
                     value="Essential"
                     checked={type === "Essential"}
                     onChange={(e) => setType(e.target.value)}
                     required
                   />
                   Essential
</label>
<label
                   className="p-3 rounded-4 border bg-white"
                   style={{ cursor: "pointer", minWidth: "180px" }}
>
<input
                     type="radio"
                     className="form-check-input me-2"
                     name="type"
                     value="Non-Essential"
                     checked={type === "Non-Essential"}
                     onChange={(e) => setType(e.target.value)}
                   />
                   Non-Essential
</label>
</div>
</div>
<div className="mb-4 p-3 rounded-4 bg-light">
<input
                 type="checkbox"
                 className="form-check-input me-2"
                 checked={recurring}
                 onChange={(e) => setRecurring(e.target.checked)}
               />
<label className="form-check-label fw-semibold">
                 Recurring Expense
</label>
<p className="text-muted mb-0 mt-1">
                 Select this if the expense repeats monthly.
</p>
</div>
<button className="btn btn-success w-100">
               Add Expense
</button>
</form>
</div>
</div>
</div>
</div>
 );
}
export default AddExpense;