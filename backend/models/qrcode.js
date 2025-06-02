const mongoose = require ( 'mongoose');

const qrCodeSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }
});

module.exports = mongoose.model("QrCode", qrCodeSchema);