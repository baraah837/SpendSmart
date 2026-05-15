import React from "react";

function Developers() {

  return (
<div className="container mt-4">
<div className="mb-4">
<h2 className="fw-bold">Development Team</h2>
<p className="text-muted">

          This page describes the team members, their roles, and the references used in developing SpendSmart.
</p>
</div>
<div className="row">
<div className="col-md-6 mb-4">
<div className="card shadow p-4" style={{ borderRadius: "18px", border: "none" }}>
<h4>Baraah Mohammed</h4>
<p className="text-muted">Front-End Developer</p>
<ul>
<li>Designed React pages and user interface</li>
<li>Implemented forms and navigation</li>
<li>Worked on Dashboard, Expenses, and Reviews pages</li>
<li>Improved layout and Bootstrap styling</li>
</ul>
</div>
</div>
<div className="col-md-6 mb-4">
<div className="card shadow p-4" style={{ borderRadius: "18px", border: "none" }}>
<h4>Ghada Mohammed</h4>
<p className="text-muted">Back-End Developer & Database Designer</p>
<ul>
<li>Created Express server and API routes</li>
<li>Designed MongoDB collections</li>
<li>Implemented authentication and JWT protection</li>
<li>Worked on CRUD operations and database connection</li>
</ul>
</div>
</div>
</div>
<div className="card shadow p-4 mt-3" style={{ borderRadius: "18px", border: "none" }}>
<h4>Project References</h4>
<ul>
<li>React Documentation — https://react.dev</li>
<li>Bootstrap Documentation — https://getbootstrap.com</li>
<li>Node.js Documentation — https://nodejs.org</li>
<li>Express.js Documentation — https://expressjs.com</li>
<li>MongoDB Documentation — https://mongodb.com/docs</li>
<li>JWT Documentation — https://jwt.io</li>
<li>Recharts Documentation — https://recharts.org</li>
</ul>
</div>
</div>

  );

}

export default Developers;
 