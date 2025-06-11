const Menu = require("../models/menu");

// GET all menu
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil menu', error: err.message });
  }
}

const createMenu = async (req, res) => {
  try {
    const { name, description, price, image, category, tags } = req.body;

    const newMenu = new Menu({ name, description, price, image, category, tags });
    await newMenu.save();

    res.status(201).json({ message: 'Menu berhasil ditambahkan', menu: newMenu });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menambahkan menu', error: err.message });
  }
}

const editMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, tags } = req.body;

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { name, description, price, image, category, tags },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: 'Menu tidak ditemukan' });
    }

    res.status(200).json({ message: 'Menu berhasil diupdate', menu: updatedMenu });
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengupdate menu', error: err.message });
  }
}

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMenu = await Menu.findByIdAndDelete(id);

    if (!deletedMenu) {
      return res.status(404).json({ message: 'Menu tidak ditemukan' });
    }

    res.status(200).json({ message: 'Menu berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus menu', error: err.message });
  }
}

module.exports = { getMenus, createMenu, editMenu, deleteMenu };