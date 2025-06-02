const express = require('express');
const QrCode = require('../models/qrcode') ;
const crypto = require('crypto') ;
const verifyKasir = require("../middleware/verifyKasir")
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", verifyKasir, async (req, res) => {
  const { tableNumber } = req.body;
  if (!tableNumber) return res.status(400).json({ error: "No table number" });

  const token = crypto.randomBytes(12).toString("hex");
  const newQr = new QrCode({ tableNumber, token });
  await newQr.save();

  res.json({ qrData: JSON.stringify({ tableNumber, token }) });
});

router.post("/validate", verifyToken, async (req, res) => {
  const { tableNumber, token } = req.body;
  if (!tableNumber || !token) return res.status(400).json({ valid: false });

  const qrCode = await QrCode.findOne({ tableNumber, token });
  if (!qrCode) return res.json({ valid: false });

  res.json({ valid: true });
});

module.exports = router;