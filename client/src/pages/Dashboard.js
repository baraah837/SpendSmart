import React, { useEffect, useState } from "react";
import axios from "axios";
import {
 PieChart,
 Pie,
 Cell,
 Tooltip,
 Legend
} from "recharts";
function Dashboard() {
 const token = localStorage.getItem("token");
 const [expenses, setExpenses] = useState([]);
 const [monthlyIncome, setMonthlyIncome] = useState(0);
 useEffect(() => {
   fetchProfile();
   fetchExpenses();
 }, []);
 const fetchProfile = async () => {
   try {
     const response = await axios.get("http://localhost:5000/api/profile", {
       headers: {
         Authorization: token
       }
     });
     setMonthlyIncome(Number(response.data.monthlyIncome || 0));
   } catch (error) {
     console.log(error);
   }
 };
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
 const totalExpenses = expenses.reduce(
   (total, expense) => total + Number(expense.amount || 0),
   0
 );
 const remainingBalance = monthlyIncome - totalExpenses;
 const categoryData = [
   {
     name: "Food",
     value: expenses
       .filter((e) => e.category === "Food")
       .reduce((sum, e) => sum + Number(e.amount || 0), 0)
   },
   {
     name: "Transport",
     value: expenses
       .filter((e) => e.category === "Transport")
       .reduce((sum, e) => sum + Number(e.amount || 0), 0)
   },
   {
     name: "Shopping",
     value: expenses
       .filter((e) => e.category === "Shopping")
       .reduce((sum, e) => sum + Number(e.amount || 0), 0)
   },
   {
     name: "Bills",
     value: expenses
       .filter((e) => e.category === "Bills")
       .reduce((sum, e) => sum + Number(e.amount || 0), 0)
   }
 ].filter((item) => item.value > 0);
 const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
 return (
<div className="container mt-4">
<h2 className="mb-4">Dashboard</h2>
<div className="row mb-4">
<div className="col-md-4 mb-3">
<div className="card shadow-sm p-3">
<h5>Monthly Income</h5>
<h3>{monthlyIncome} OMR</h3>
</div>
</div>
<div className="col-md-4 mb-3">
<div className="card shadow-sm p-3">
<h5>Total Expenses</h5>
<h3>{totalExpenses} OMR</h3>
</div>
</div>
<div className="col-md-4 mb-3">
<div className="card shadow-sm p-3">
<h5>Remaining Balance</h5>
<h3>{remainingBalance} OMR</h3>
</div>
</div>
</div>
<div className="alert alert-info">
<strong>Budget Status:</strong>{" "}
       {totalExpenses > monthlyIncome
         ? "You exceeded your budget"
         : "Good: You are within your budget"}
</div>
<div className="row mt-5">
<div className="col-md-6">
<h4>Expenses By Category</h4>
         {categoryData.length > 0 ? (
<PieChart width={400} height={300}>
<Pie
               data={categoryData}
               cx={200}
               cy={150}
               outerRadius={100}
               dataKey="value"
               label
>
               {categoryData.map((entry, index) => (
<Cell
                   key={index}
                   fill={COLORS[index % COLORS.length]}
                 />
               ))}
</Pie>
<Tooltip />
<Legend />
</PieChart>
         ) : (
<div className="alert alert-warning">
             No expenses added yet
</div>
         )}
</div>
<div className="col-md-6">
<h4>Recent Expenses</h4>
<table className="table table-bordered table-striped mt-3">
<thead className="table-dark">
<tr>
<th>Title</th>
<th>Amount</th>
<th>Category</th>
<th>Date</th>
</tr>
</thead>
<tbody>
             {expenses.slice(0, 5).map((expense) => (
<tr key={expense._id}>
<td>{expense.title}</td>
<td>{expense.amount}</td>
<td>{expense.category}</td>
<td>
                   {expense.date ? expense.date.substring(0, 10) : ""}
</td>
</tr>
             ))}
</tbody>
</table>
         {expenses.length === 0 && (
<div className="alert alert-warning">
             No recent expenses found
</div>
         )}
</div>
</div>
</div>
 );
}
export default Dashboard;