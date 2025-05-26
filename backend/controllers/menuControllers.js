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

module.exports = { getMenus, createMenu };