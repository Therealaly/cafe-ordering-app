const moongose = require('mongoose');

const promoSchema = new moongose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = moongose.model('Promo', promoSchema);