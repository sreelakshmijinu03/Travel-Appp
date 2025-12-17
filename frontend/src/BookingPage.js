// src/BookingPage.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./api";

export default function BookingPage() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [destination, setDestination] = useState(null);
  const nav = useNavigate();

  const params = new URLSearchParams(window.location.search);
  const destId = params.get("id");

  useEffect(() => {
    if (!destId) return;
    fetch(API + "/destinations")
      .then(res => res.json())
      .then(data => {
        const found = data.find(d => String(d.id) === String(destId));
        setDestination(found || null);
      });
  }, [destId]);

  const days =
    fromDate && toDate
      ? Math.max(
          1,
          Math.round(
            (new Date(toDate).getTime() - new Date(fromDate).getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      : null;

  const book = async () => {
    if (!fromDate || !toDate) {
      alert("Please select both start and end dates.");
      return;
    }
    if (new Date(toDate) < new Date(fromDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    // For DB we can store the start date as 'date'
    await fetch(API + "/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: localStorage.getItem("uid"),
        destination_id: destId,
        date: fromDate
      })
    });

    alert("Booking confirmed! 🎉");
    nav("/home");
  };

  return (
    <>
      <div className="navbar">
        <h1>✈️ TravelBuddy</h1>
      </div>
      <div className="page">
        <div className="card-centered">
          <h2>Choose your trip dates 📅</h2>
          {destination && (
            <p style={{ marginBottom: 10, fontSize: 14 }}>
              Destination: <b>{destination.name}</b> ({destination.country}) •{" "}
              <b>{destination.days}</b> days package.
            </p>
          )}
          <p style={{ marginBottom: 12, fontSize: 13, color: "#555" }}>
            Select when your trip starts and ends. The app will show the total
            number of days for your stay.
          </p>

          <label style={{ fontSize: 13 }}>From (start date)</label>
          <input
            type="date"
            onChange={e => setFromDate(e.target.value)}
            style={{ marginBottom: 10 }}
          />

          <label style={{ fontSize: 13 }}>To (end date)</label>
          <input
            type="date"
            onChange={e => setToDate(e.target.value)}
            style={{ marginBottom: 10 }}
          />

          {days && (
            <p style={{ margin: "8px 0 14px", fontSize: 14 }}>
              You are booking a trip for <b>{days}</b> day(s).
            </p>
          )}

          <button className="btn-primary" onClick={book}>
            Confirm booking
          </button>
        </div>
      </div>
    </>
  );
}
