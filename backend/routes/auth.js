const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// Simple login 
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ success:false, msg:"Missing fields" });

    db.query("SELECT * FROM users WHERE username=?", [username], (err, users) => {
        if (err) return res.status(500).json({ success:false, msg:"DB error" });

        if (users.length === 0)
            return res.json({ success: false, msg: "User not found" });

        const match = bcrypt.compareSync(password, users[0].password);

        if (!match)
            return res.json({ success: false, msg: "Incorrect password" });

        res.json({ success: true, userId: users[0].id });
    });
});

// signup route 
router.post("/signup", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.json({ success:false, msg:"Missing fields" });
    const hashed = bcrypt.hashSync(password, 8);
    db.query("INSERT INTO users (username, password) VALUES (?,?)", [username, hashed], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') return res.json({ success:false, msg:"Username exists" });
            return res.status(500).json({ success:false, msg:"DB error" });
        }
        res.json({ success:true, userId: result.insertId });
    });
});

module.exports = router;
