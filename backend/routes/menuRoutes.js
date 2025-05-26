const express = require('express');
const router = express.Router();
const { getMenus, createMenu } = require("../controllers/menuControllers")
const verifyToken = require("../middleware/authMiddleware")

router.get("/", getMenus);
router.post("/", verifyToken, createMenu);

module.exports = router;