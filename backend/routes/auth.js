const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT id, username, password, is_admin FROM users WHERE username=?",
    [username],
    (err, users) => {
      if (err) return res.status(500).json({ success: false });

      if (users.length === 0)
        return res.json({ success: false, msg: "User not found" });

      const user = users[0];
      const match = bcrypt.compareSync(password, user.password);

      if (!match)
        return res.json({ success: false, msg: "Wrong password" });

      // ✅ STORE EVERYTHING FRONTEND NEEDS
      res.json({
        success: true,
        user: {
          id: user.id,
          username: user.username,
          is_admin: user.is_admin === 1
        }
      });
    }
  );
});

module.exports = router;
