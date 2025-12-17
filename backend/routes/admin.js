const express = require("express");
const router = express.Router();
const db = require("../db");

// Check admin by user ID
router.get("/check/:id", (req, res) => {
  const userId = req.params.id;

  db.query(
    "SELECT is_admin FROM users WHERE id = ?",
    [userId],
    (err, result) => {
      if (err) return res.status(500).json({ success: false });

      if (result.length === 0)
        return res.json({ success: false });

      if (result[0].is_admin === 1) {
        return res.json({ success: true, is_admin: true });
      }

      res.json({ success: true, is_admin: false });
    }
  );
});

module.exports = router;
