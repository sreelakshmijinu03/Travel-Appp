// src/AdminBookings.js
import { useEffect, useState } from "react";
import { API } from "./api";

export default function AdminBookings() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (from) params.append("from", from);
      if (to) params.append("to", to);

      const res = await fetch(API + "/bookings/admin?" + params.toString());
      const data = await res.json();

      if (data.success && Array.isArray(data.bookings)) {
        setBookings(data.bookings);
      } else {
        setBookings([]);
      }
    } catch (e) {
      console.error("Failed to load bookings", e);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []); // run once on mount

  return (
    <>
      <div className="navbar">
        <h1>🛠️ Admin – TravelBuddy</h1>
      </div>

      <div className="page">
        <h2 className="section-title">All bookings overview</h2>

        <div className="filter-row">
          <div>
            <label style={{ fontSize: 13 }}>From date</label>
            <br />
            <input
              type="date"
              value={from}
              onChange={e => setFrom(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 13 }}>To date</label>
            <br />
            <input
              type="date"
              value={to}
              onChange={e => setTo(e.target.value)}
            />
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            <button onClick={loadBookings}>Apply filter</button>
          </div>
        </div>

        <div className="table-wrapper">
          {loading ? (
            <p>Loading bookings...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Traveler</th>
                  <th>Destination</th>
                  <th>Country</th>
                  <th>Start date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="5">No bookings found.</td>
                  </tr>
                )}
                {bookings.map((b, idx) => (
                  <tr key={b.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{b.username}</td>
                    <td>{b.destination}</td>
                    <td>{b.country}</td>
                    <td>
                      {b.date ? new Date(b.date).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
