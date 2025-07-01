const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyKasir = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || !['kasir', 'admin'].includes(user.role)) {
      return res.status(403).json({ message: "Akses ditolak: bukan kasir" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid", error: err.message });
  }
};

module.exports = verifyKasir;
