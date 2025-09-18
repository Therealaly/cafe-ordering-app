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
  const { cashierId } = req.user.id; // Mengambil id kasir dari session storage

  try {
    const order = await Order.findById(orderId);
      if(!order) {
        return res.status(404).json({ message: "Order tidak ditemukan" });
      } 

    let confirmDate = order.confirmedAt;
    if(!confirmDate) {
      confirmDate = new Date()
    }

    const updatedOrder = await Order.findByIdAndUpdate( // mencari order berdasarkan orderId
      orderId,
      {status, confirmedBy: cashierId, confirmedAt: confirmDate},
      {new: true}
    );

    res.status(200).json({ message: "Status order berhasil diperbarui", order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: "Gagal memperbarui status order", error: err.message });
  } 
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndDelete(orderId);
    if(!order) {
      return res.status(404).json({ message: "Order tidak ditemukan" });
    }
    if(order.status !== 'Menunggu Konfirmasi') {
      return res.status(400).json({ message: "Hanya order dengan status 'Menunggu Konfirmasi' yang dapat dihapus" });
    }
    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus order", error: err.message });
  }
}

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