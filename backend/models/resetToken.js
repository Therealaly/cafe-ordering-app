const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  token: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now, expires: 900}
});

module.exports = mongoose.model("ResetToken", resetTokenSchema);
