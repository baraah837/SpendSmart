import React from "react";
import { Link } from "react-router-dom";
function Home() {
 return (
<div className="text-center">
<h1>Welcome to SpendSmart</h1>
<p className="lead">
       A simple web application to manage your monthly budget and expenses.
</p>
<Link to="/add-expense" className="btn btn-primary">
       Start Tracking
</Link>
</div>
 );
}
export default Home;