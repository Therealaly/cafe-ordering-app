const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  tags: {type: String, required: true},
  options: [{
    type: String, 
  }]
}, { timestamps: true});

module.exports = mongoose.model("Menu", menuSchema);
