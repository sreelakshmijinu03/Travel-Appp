const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
    const { user_id, destination_id, date } = req.body;
    if (!user_id || !destination_id || !date) return res.json({ success:false, msg:"Missing fields" });

    db.query(
        "INSERT INTO bookings (user_id, destination_id, date) VALUES (?,?,?)",
        [user_id, destination_id, date],
        (err, result) => {
            if (err) return res.status(500).json({ success:false, msg:"DB error" });
            res.json({ success: true, bookingId: result.insertId });
        }
    );
});

module.exports = router;
