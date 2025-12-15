const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "", // <-- set your MySQL root password if any
    database: "travel_app"
});

db.connect(err => {
    if (err) {
        console.error("MySQL connection error:", err);
        process.exit(1);
    }
    console.log("MySQL Connected!");
});

module.exports = db;
