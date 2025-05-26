const Promo = require("../models/promo");

// GET all promos
const getPromo = async (req, res) => {
  try {
    const promos = await Promo.find();
    res.status(200).json(promos);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil promosi', error: err.message });
  }
}

const createPromo = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const newPromo = new Promo({ title, description, image });
    await newPromo.save();

    res.status(201).json({ message: 'Promosi berhasil ditambahkan', promo: newPromo });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan promosi', error: err.message });
  }
}

module.exports = { getPromo, createPromo };