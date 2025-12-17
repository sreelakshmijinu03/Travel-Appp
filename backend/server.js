// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");

app.use(express.json());
app.use(cors());

// API routes
app.use("/auth", require("./routes/auth"));
app.use("/destinations", require("./routes/destinations")); // ✅ must match file name
app.use("/bookings", require("./routes/bookings"));

/* ADMIN BOOKINGS API (if you are still using this) */
app.get("/admin/bookings", (req, res) => {
  const sql = `
    SELECT 
      bookings.id,
      users.username,
      bookings.destination,
      bookings.travel_date,
      bookings.people
    FROM bookings
    JOIN users ON bookings.user_id = users.id
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Admin bookings error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
