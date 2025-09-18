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
  const { adminId } = req.user.id
  try {
    const { title, description, image } = req.body;

    const newPromo = new Promo({ title, description, image, createdBy: adminId });
    await newPromo.save();

    res.status(201).json({ message: 'Promosi berhasil ditambahkan', promo: newPromo });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan promosi', error: err.message });
  }
}

// Edit promo
const editPromo = async (req, res) => {
  const { adminId } = req.user.id
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const updatedPromo = await Promo.findByIdAndUpdate(
      id,
      { title, description, image, updatedBy: adminId },
      { new: true }
    );

    if (!updatedPromo) {
      return res.status(404).json({ message: 'Promosi tidak ditemukan' });
    }

    res.status(200).json({ message: 'Promosi berhasil diupdate', promo: updatedPromo });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengupdate promosi', error: err.message });
  }
}

// Delete promo
const deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPromo = await Promo.findByIdAndDelete(id);

    if (!deletedPromo) {
      return res.status(404).json({ message: 'Promosi tidak ditemukan' });
    }

    res.status(200).json({ message: 'Promosi berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus promosi', error: err.message });
  }
}

const togglePromoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const promo = await Promo.findById(id);
    if (!promo) {
      return res.status(404).json({ message: 'Promosi tidak ditemukan' });
    }

    promo.isActive = !promo.isActive; // Toggle status
    await promo.save();
    res.status(200).json({ message: 'Status promosi berhasil diubah', promo });
  }
  catch (err) {
    return res.status(500).json({ message: 'Gagal mengubah status promosi', error: err.message });
  }
}

module.exports = { getPromo, createPromo, editPromo, deletePromo, togglePromoStatus };