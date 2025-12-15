import { useState } from "react";
import { API } from "./api";

export default function BookingPage() {
  const [date, setDate] = useState("");
  const destId = new URLSearchParams(window.location.search).get("id");

  const book = async () => {
    await fetch(API + "/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: localStorage.getItem("uid"),
        destination_id: destId,
        date
      })
    });
    alert("🎉 Booking Confirmed!");
    window.location = "/home";
  };

  return (
    <div className="container">
      <div className="card">
        <h2>📅 Select Travel Date</h2>
        <input type="date" onChange={e => setDate(e.target.value)} />
        <button onClick={book}>Confirm Booking</button>
      </div>
    </div>
  );
}
