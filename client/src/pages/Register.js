import React, { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "http://localhost:5000/api/register",

        {

          name,

          email,

          password

        }

      );

      alert("Registration successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Registration failed");

    }

  };

  return (
<div

      className="d-flex justify-content-center align-items-center"

      style={{

        minHeight: "100vh",

        background: "#f4f6f9"

      }}
>
<div

        className="card shadow p-4"

        style={{

          width: "420px",

          borderRadius: "20px"

        }}
>
<h1

          className="text-center mb-2"

          style={{

            fontWeight: "bold",

            color: "#212529"

          }}
>

          SpendSmart
</h1>
<p

          className="text-center text-muted mb-4"
>

          Smart Expense Tracker
</p>
<h3 className="text-center mb-4">

          Register
</h3>
<form onSubmit={handleRegister}>
<div className="mb-3">
<label className="form-label">

              Full Name
</label>
<input

              type="text"

              className="form-control"

              value={name}

              onChange={(e) =>

                setName(e.target.value)

              }

              required

            />
</div>
<div className="mb-3">
<label className="form-label">

              Email
</label>
<input

              type="email"

              className="form-control"

              value={email}

              onChange={(e) =>

                setEmail(e.target.value)

              }

              required

            />
</div>
<div className="mb-3">
<label className="form-label">

              Password
</label>
<input

              type="password"

              className="form-control"

              value={password}

              onChange={(e) =>

                setPassword(e.target.value)

              }

              required

            />
</div>
<button

            className="btn btn-dark w-100 mt-2"

            style={{

              borderRadius: "10px",

              padding: "10px"

            }}
>

            Register
</button>
</form>
<p className="mt-4 text-center">

          Already have an account?

          {" "}
<Link to="/login">

            Login
</Link>
</p>
</div>
</div>

  );

}

export default Register;
 