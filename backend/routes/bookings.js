const express = require("express");
const router = express.Router();
const db = require("../db");

// ==========================
// Create booking (USER)
// ==========================
router.post("/", (req, res) => {
  const { user_id, destination_id, travel_date, people } = req.body;

  if (!user_id || !destination_id || !travel_date || !people) {
    return res.status(400).json({ success: false, msg: "Missing fields" });
  }

  db.query(
    "INSERT INTO bookings (user_id, destination_id, travel_date, people) VALUES (?,?,?,?)",
    [user_id, destination_id, travel_date, people],
    (err, result) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ success: false, msg: "DB error" });
      }
      res.json({ success: true, bookingId: result.insertId });
    }
  );
});

// ==========================
// Admin: view all bookings
// ==========================
router.get("/admin", (req, res) => {
  const sql = `
    SELECT 
      b.id,
      u.username,
      d.name AS destination,
      b.travel_date,
      b.people
    FROM bookings b
    JOIN users u ON b.user_id = u.id
    JOIN destinations d ON b.destination_id = d.id
    ORDER BY b.travel_date DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, msg: "DB error", bookings: [] });
    }

    res.json(results); // return array of bookings
  });
});

module.exports = router;
