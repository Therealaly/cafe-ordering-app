const express = require('express');
const router = express.Router();
const Menu = require('../models/menu');
const Order = require('../models/order');
const natural = require('natural');
const verifyToken = require('../middleware/authMiddleware');

// menghitung cosinw similarity
function cosineSimilarity(vecA, vecB) {

  // menggunakan set untuk menggabungkan semua kunci dari kedua vektor 
  const allTerms = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  // inisialisasi variabel
  let dotProduct = 0; // nilai dot product
  let magnitudeA = 0; // nilai akar kuadrat dari jumlah vektor A
  let magnitudeB = 0; // nilai akar kuadrat dari jumlah vektor B

  // iterasi semua term untuk menghitung dot product dan magnitudes dari kedua vektor
  // jika term tidak ada di vektor, maka nilainya dianggap 0
  allTerms.forEach(term => {
    const a = vecA[term] || 0;
    const b = vecB[term] || 0;
    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  });

  return magnitudeA && magnitudeB ? dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB)) : 0;
}

router.get('/:userId', verifyToken, async (req, res) => {
  const {userId} = req.params; // ambil id dari parameter url

  try {
    const allMenu = await Menu.find(); // ambil semua menu dari db
    const userOrders = await Order.find({ userId }) // ambil semua order berdasarkan userId
      .populate('items.menuId') // populate (expand data) items.menuId untuk mendapatkan data menu lengkap

    const orderedMenuId = userOrders.flatMap(order => order.items.map(item => item.menuId)); // mengakses semua menu yg dipesan user (membuka sampai menuId)
    const userTags = orderedMenuId.flatMap(menu => menu.tags.split(',').map(tag => tag.trim())).join(' '); 
    // dari menuId, ambil tags, split berdasar koma (jadi array), 
    // trim untuk menghapus spasi, lalu gabungkan menjadi string
    // CONTOH HASILNYA => "kopi susu manis dingin teh manis hangat"

    // membuat vektor TF-IDF untuk semua menu
    // vektor TF-IDF dibuat oleh library natura
    const tfidf = new natural.TfIdf();
    allMenu.forEach(menu => {
      tfidf.addDocument(menu.tags);
    });

    // membuat vektor TF-IDF untuk user berdasarkan tags yang sudah digabungkan
    const userTfidf = new natural.TfIdf();
    userTfidf.addDocument(userTags); // membuat dokumen TF-IDF untuk user berdasarkan tags yang sudah digabungkan
    const userVector = userTfidf.documents[0]; // representasi vektor TF-IDF untuk user

    const recommendations = allMenu.map((menu, index) => {
      const menuVector = tfidf.documents[index]; // ambil vektor TF-IDF untuk setiap menu
      const score = cosineSimilarity(userVector, menuVector); // menghitung cosine similarity antara vektor user dan menu
      return {
        menu,
        score,
      };
    });

    // Filter menu yang belum pernah dipesan user
    const orderedIds = orderedMenuId.map(menu => menu._id.toString());
    const recommendedMenus = recommendations
      .filter(r => !orderedIds.includes(r.menu._id.toString()))
      .sort((a, b) => b.score - a.score)
      .map(r => r.menu);

    return res.json(recommendedMenus);
  
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }

});

module.exports = router;
  