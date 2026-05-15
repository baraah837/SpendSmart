import React, { useState } from "react";

import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "https://spendsmart-backend-78y2.onrender.com/api/login",

        {

          email,

          password

        }

      );

      localStorage.setItem(

        "token",

        response.data.token

      );

      localStorage.setItem(

        "user",

        JSON.stringify(response.data.user)

      );

      alert("Login successful");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Invalid email or password");

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

          Login
</h3>
<form onSubmit={handleLogin}>
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

            Login
</button>
</form>
<p className="mt-4 text-center">

          Don't have an account?

          {" "}
<Link to="/register">

            Register
</Link>
</p>
</div>
</div>

  );

}

export default Login;
 