const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus } = require("../controllers/orderControllers")
const verifyToken = require("../middleware/authMiddleware")
const verifyKasir = require("../middleware/verifyKasir")

router.post("/", verifyToken, createOrder);
router.get("/", verifyKasir, getAllOrders);
router.patch("/:orderId/status", verifyKasir, updateOrderStatus);

module.exports = router;