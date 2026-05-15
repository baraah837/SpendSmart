import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
 const navigate = useNavigate();
 const location = useLocation();
 const logout = () => {
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   navigate("/login");
   window.location.reload();
 };
 const navStyle = (path) => ({
   color: location.pathname === path ? "#ffffff" : "#d1d5db",
   fontWeight: location.pathname === path ? "700" : "500",
   fontSize: "17px",
   padding: "10px 18px",
   borderRadius: "12px",
   textDecoration: "none",
   background:
     location.pathname === path
       ? "rgba(255,255,255,0.15)"
       : "transparent",
   transition: "0.3s"
 });
 return (
<nav
     className="navbar navbar-expand-lg px-4 py-3 shadow-sm"
     style={{
       background: "linear-gradient(90deg, #0f172a, #1e3a8a)"
     }}
>
<div className="container-fluid">
<Link
         to="/dashboard"
         style={{
           color: "white",
           fontSize: "32px",
           fontWeight: "800",
           textDecoration: "none",
           marginRight: "40px"
         }}
>
         SpendSmart
</Link>
<div
         className="d-flex align-items-center gap-2 flex-wrap"
>
<Link to="/dashboard" style={navStyle("/dashboard")}>
           Dashboard
</Link>
<Link to="/add-expense" style={navStyle("/add-expense")}>
           Add Expense
</Link>
<Link to="/expenses" style={navStyle("/expenses")}>
           Expenses
</Link>
<Link to="/reviews" style={navStyle("/reviews")}>
           Reviews
</Link>
<Link to="/profile" style={navStyle("/profile")}>
           Profile
</Link>
<Link to="/developers" style={navStyle("/developers")}>
           Developers
</Link>
</div>
<button
         onClick={logout}
         className="btn ms-auto"
         style={{
           background: "white",
           color: "#111827",
           fontWeight: "700",
           borderRadius: "14px",
           padding: "10px 24px",
           border: "none",
           fontSize: "16px"
         }}
>
         Logout
</button>
</div>
</nav>
 );
}
export default Navbar;