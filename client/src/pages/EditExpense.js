import React, { useEffect, useState } from "react";

import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

function EditExpense() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [amount, setAmount] = useState("");

  const [category, setCategory] = useState("");

  const [type, setType] = useState("");

  const [recurring, setRecurring] = useState(false);

  const [date, setDate] = useState("");

  useEffect(() => {

    getExpense();

  }, []);

  const getExpense = async () => {

    try {

      const response = await axios.get(`https://spendsmart-backend-78y2.onrender.com/api/expenses`);

      const selectedExpense = response.data.find((item) => item._id === id);

      if (selectedExpense) {

        setTitle(selectedExpense.title);

        setAmount(selectedExpense.amount);

        setCategory(selectedExpense.category);

        setType(selectedExpense.type);

        setRecurring(selectedExpense.recurring);

        setDate(selectedExpense.date ? selectedExpense.date.substring(0, 10) : "");

      }

    } catch (error) {

      console.log(error);

    }

  };

  const updateExpense = async (e) => {

    e.preventDefault();

    const updatedData = {

      title,

      amount,

      category,

      type,

      recurring,

      date

    };

    try {

      await axios.put(`https://spendsmart-backend-78y2.onrender.com/api/expenses/${id}`, updatedData);

      alert("Expense Updated Successfully");

      navigate("/expenses");

    } catch (error) {

      alert("Error updating expense");

    }

  };

  return (
<div className="container mt-4">
<h2>Edit Expense</h2>
<form onSubmit={updateExpense}>
<div className="mb-3">
<label className="form-label">Expense Title</label>
<input

            type="text"

            className="form-control"

            value={title}

            onChange={(e) => setTitle(e.target.value)}

          />
</div>
<div className="mb-3">
<label className="form-label">Amount</label>
<input

            type="number"

            className="form-control"

            value={amount}

            onChange={(e) => setAmount(e.target.value)}

          />
</div>
<div className="mb-3">
<label className="form-label">Category</label>
<select

            className="form-select"

            value={category}

            onChange={(e) => setCategory(e.target.value)}
>
<option value="">Select Category</option>
<option value="Food">Food</option>
<option value="Transport">Transport</option>
<option value="Shopping">Shopping</option>
<option value="Bills">Bills</option>
</select>
</div>
<div className="mb-3">
<label className="form-label d-block">Expense Type</label>
<input

            type="radio"

            name="type"

            value="Essential"

            checked={type === "Essential"}

            onChange={(e) => setType(e.target.value)}

          />{" "}

          Essential
<br />
<input

            type="radio"

            name="type"

            value="Non-Essential"

            checked={type === "Non-Essential"}

            onChange={(e) => setType(e.target.value)}

          />{" "}

          Non-Essential
</div>
<div className="mb-3 form-check">
<input

            type="checkbox"

            className="form-check-input"

            checked={recurring}

            onChange={(e) => setRecurring(e.target.checked)}

          />
<label className="form-check-label">Recurring Expense</label>
</div>
<div className="mb-3">
<label className="form-label">Expense Date</label>
<input

            type="date"

            className="form-control"

            value={date}

            onChange={(e) => setDate(e.target.value)}

          />
</div>
<button className="btn btn-success">Update Expense</button>
</form>
</div>

  );

}

export default EditExpense;
 