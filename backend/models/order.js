const moongose = require('mongoose');
const { create } = require('./user');

const orderSchema = new moongose.Schema({
  userId: {
    type: moongose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    menuId: {
      type: moongose.Schema.Types.ObjectId,
      ref: 'Menu',
      required: true
    },
    quantity: { type: Number, required: true }
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
});

module.exports = moongose.model('Order', orderSchema);