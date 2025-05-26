const express = require('express');
const router = express.Router();
const { getPromo, createPromo } = require("../controllers/promoControllers")
const verifyToken = require("../middleware/authMiddleware");

router.get("/", getPromo);
router.post("/", verifyToken, createPromo);

module.exports = router;