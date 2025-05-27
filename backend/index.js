const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// route API
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const menuRoutes = require("./routes/menuRoutes")
const promoRoutes = require("./routes/promoRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/order", orderRoutes);
app.use("/api/promo", promoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/menu", menuRoutes);

// Coba koneksi MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
