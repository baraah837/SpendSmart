import React, { useEffect, useState } from "react";

import axios from "axios";

function Profile() {

  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");

  const [monthlyIncome, setMonthlyIncome] = useState("");

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response = await axios.get("http://localhost:5000/api/profile", {

        headers: {

          Authorization: token

        }

      });

      setUser(response.data);

      setName(response.data.name);

      setMonthlyIncome(response.data.monthlyIncome);

      setProfileImage(response.data.profileImage || "");

    } catch (error) {

      console.log(error);

    }

  };

  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setProfileImage(reader.result);

    };

    reader.readAsDataURL(file);

  };

  const updateProfile = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.put(

        "http://localhost:5000/api/profile",

        {

          name,

          monthlyIncome,

          profileImage

        },

        {

          headers: {

            Authorization: token

          }

        }

      );

      localStorage.setItem("user", JSON.stringify(response.data));

      alert("Profile updated successfully");

      setUser(response.data);

    } catch (error) {

      console.log(error);

      alert("Error updating profile");

    }

  };

  if (!user) {

    return <div className="alert alert-info">Loading profile...</div>;

  }

  return (
<div className="container mt-4">
<div className="card shadow" style={{ borderRadius: "18px", overflow: "hidden" }}>
<div

          style={{

            height: "180px",

            background: "linear-gradient(135deg, #212529, #198754)"

          }}
></div>
<div className="p-4">
<div className="d-flex align-items-end" style={{ marginTop: "-90px" }}>
<img

              src={

                profileImage ||

                "https://cdn-icons-png.flaticon.com/512/149/149071.png"

              }

              alt="Profile"

              style={{

                width: "150px",

                height: "150px",

                borderRadius: "50%",

                objectFit: "cover",

                border: "5px solid white",

                backgroundColor: "white"

              }}

            />
<div className="ms-4 mb-3">
<h2>{user.name}</h2>
<p className="text-muted mb-0">SpendSmart User</p>
</div>
</div>
<hr />
<form onSubmit={updateProfile}>
<div className="mb-3">
<label className="form-label">Profile Image</label>
<input

                type="file"

                className="form-control"

                accept="image/*"

                onChange={handleImageUpload}

              />
</div>
<div className="mb-3">
<label className="form-label">Full Name</label>
<input

                type="text"

                className="form-control"

                value={name}

                onChange={(e) => setName(e.target.value)}

              />
</div>
<div className="mb-3">
<label className="form-label">Email</label>
<input

                type="email"

                className="form-control"

                value={user.email}

                disabled

              />
</div>
<div className="mb-3">
<label className="form-label">Monthly Income</label>
<input

                type="number"

                className="form-control"

                value={monthlyIncome}

                onChange={(e) => setMonthlyIncome(e.target.value)}

              />
</div>
<button className="btn btn-success">

              Save Changes
</button>
</form>
</div>
</div>
</div>

  );

}

export default Profile;
 