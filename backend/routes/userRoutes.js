const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Berhasil mengambil profil",
    user: req.user,
  })
})

router.get('/orders/:id', authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Berhasil mengambil pesanan",
    user: req.user,
  })
})

router.post('/new-order', authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Berhasil membuat pesanan",
    user: req.user,
  })
})

module.exports = router;
