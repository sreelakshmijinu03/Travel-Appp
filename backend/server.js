const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/auth"));
app.use("/destinations", require("./routes/destinations"));
app.use("/bookings", require("./routes/bookings"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
