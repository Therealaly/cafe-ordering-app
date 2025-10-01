const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    menuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Menu',
      required: true
    },
    quantity: { type: Number, required: true },
    options: {type: String}
  }],
  tableNumber: { type: String, required: true },
  status: {
    type: String,
    enum: ['Menunggu Konfirmasi', 'Disiapkan', 'Selesai'],
    default: 'Menunggu Konfirmasi'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  confirmedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  confirmedAt: {
    type: Date,
    default: null
  }
});

module.exports = mongoose.model('Order', orderSchema);