const Order = require ("../models/order");

exports.createOrder = async (req, res) => {
  const {items, tableNumber} = req.body;
  const userId = req.user.id //jwt token user yang sudah login

  try {
    const newOrder = new Order({
      userId,
      items,
      tableNumber,
      status: 'Menunggu Konfirmasi',
      createdAt: new Date()
    });

    await newOrder.save();
    res.status(201).json({ message: "Order berhasil dibuat", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Gagal membuat order", error: err.message });
  };

};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
    .populate('userId', 'name email') // Mengambil data user yang membuat order
    .populate('items.menuId', 'name price'); // Mengambil data menu dari setiap item dalam order

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil daftar order", error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params; // mengambil orderId dari parameter URL
  const { status } = req.body; // mengambil status dari body request

  try {
    const updatedOrder = await Order.findByIdAndUpdate( // mencari order berdasarkan orderId
      orderId,
      { status }, 
      { new: true } 
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    } 

    res.status(200).json({ message: "Status order berhasil diperbarui", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui status order", error: err.message });
  } 
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId }) 
      .populate('items.menuId')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil daftar order", error: err.message });
  }
};