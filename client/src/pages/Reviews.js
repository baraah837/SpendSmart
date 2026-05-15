import React, { useEffect, useState } from "react";
import axios from "axios";
function Reviews() {
 const token = localStorage.getItem("token");
 const user = JSON.parse(localStorage.getItem("user"));
 const [rating, setRating] = useState("");
 const [comment, setComment] = useState("");
 const [reviews, setReviews] = useState([]);
 useEffect(() => {
   fetchReviews();
 }, []);
 const fetchReviews = async () => {
   try {
     const response = await axios.get("https://spendsmart-wa7d.onrender.com/api/reviews", {
       headers: {
         Authorization: token
       }
     });
     setReviews(response.data);
   } catch (error) {
     console.log(error);
   }
 };
 const addReview = async (e) => {
   e.preventDefault();
   try {
     await axios.post(
       "https://spendsmart-wa7d.onrender.com/api/reviews",
       {
         rating,
         comment
       },
       {
         headers: {
           Authorization: token
         }
       }
     );
     alert("Review added successfully");
     setRating("");
     setComment("");
     fetchReviews();
   } catch (error) {
     console.log(error);
     alert("Error adding review");
   }
 };
 const deleteReview = async (id) => {
   try {
     await axios.delete(`https://spendsmart-wa7d.onrender.com/api/reviews/${id}`, {
       headers: {
         Authorization: token
       }
     });
     fetchReviews();
   } catch (error) {
     console.log(error);
     alert("Error deleting review");
   }
 };
 return (
<div className="container mt-4">
<div className="mb-4">
<h2 className="fw-bold">User Reviews</h2>
<p className="text-muted">
         Share your feedback and rating about SpendSmart.
</p>
</div>
<div className="row">
<div className="col-md-5 mb-4">
<div
           className="card shadow p-4"
           style={{
             borderRadius: "20px",
             border: "none"
           }}
>
<h4 className="mb-3">Add Your Review</h4>
<form onSubmit={addReview}>
<div className="mb-3">
<label className="form-label">Rating</label>
<select
                 className="form-select"
                 value={rating}
                 onChange={(e) => setRating(e.target.value)}
                 required
>
<option value="">Choose rating</option>
<option value="5">★★★★★ Excellent</option>
<option value="4">★★★★ Very Good</option>
<option value="3">★★★ Good</option>
<option value="2">★★ Fair</option>
<option value="1">★ Poor</option>
</select>
</div>
<div className="mb-3">
<label className="form-label">Comment</label>
<textarea
                 className="form-control"
                 rows="5"
                 placeholder="Write your comment..."
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                 required
></textarea>
</div>
<button className="btn btn-dark w-100">
               Submit Review
</button>
</form>
</div>
</div>
<div className="col-md-7">
         {reviews.length === 0 && (
<div className="alert alert-warning">
             No reviews yet.
</div>
         )}
         {reviews.map((review) => (
<div
             key={review._id}
             className="card shadow-sm mb-3"
             style={{
               borderRadius: "18px",
               border: "none"
             }}
>
<div className="card-body">
<div className="d-flex justify-content-between">
<div>
<h5 className="mb-1">{review.userName}</h5>
<div
                     style={{
                       color: "#f5b301",
                       fontSize: "22px"
                     }}
>
                     {"★".repeat(review.rating)}
                     {"☆".repeat(5 - review.rating)}
</div>
</div>
<small className="text-muted">
                   {review.createdAt
                     ? review.createdAt.substring(0, 10)
                     : ""}
</small>
</div>
<p className="mt-3 mb-2">{review.comment}</p>
               {user && review.userId === user.id && (
<button
                   className="btn btn-outline-danger btn-sm"
                   onClick={() => deleteReview(review._id)}
>
                   Delete
</button>
               )}
</div>
</div>
         ))}
</div>
</div>
</div>
 );
}
export default Reviews;