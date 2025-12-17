// backend/routes/destinations.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /destinations  -> return all destination rows
router.get("/", (req, res) => {
  db.query("SELECT * FROM destinations", (err, results) => {
    if (err) {
      console.error("Destinations DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    res.json(results);
  });
});

module.exports = router;
    