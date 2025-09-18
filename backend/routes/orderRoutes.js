const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, updateOrderStatus, getUserOrders, deleteOrder } = require("../controllers/orderControllers")
const verifyToken = require("../middleware/authMiddleware")
const verifyKasir = require("../middleware/verifyKasir")

router.post("/", verifyToken, createOrder);
router.get("/", verifyKasir, getAllOrders);
router.patch("/:orderId/status", verifyKasir, updateOrderStatus);
router.delete("/delete/:orderId", verifyKasir, deleteOrder);

router.get("/user", verifyToken, getUserOrders)
module.exports = router;