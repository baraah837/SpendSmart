import React, { useState } from "react";
function NearbyATM() {
 const [location, setLocation] = useState(null);
 const getLocation = () => {
   navigator.geolocation.getCurrentPosition(
     (position) => {
       setLocation({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude
       });
     },
     () => {
       alert("Location access denied");
     }
   );
 };
 return (
<div className="container mt-4">
<h2>Nearby ATM & Banks</h2>
<button
       className="btn btn-primary mt-3"
       onClick={getLocation}
>
       Get My Location
</button>
     {location && (
<div className="mt-4">
<div className="card p-4 shadow-sm">
<h5>Your Current Location</h5>
<p>
<strong>Latitude:</strong> {location.latitude}
</p>
<p>
<strong>Longitude:</strong> {location.longitude}
</p>
<a
             href={`https://www.google.com/maps/search/ATM/@${location.latitude},${location.longitude},15z`}
             target="_blank"
             rel="noreferrer"
             className="btn btn-success"
>
             Find Nearby ATM
</a>
</div>
</div>
     )}
</div>
 );
}
export default NearbyATM;