const express = require('express');
const router = express.Router();
const { getPromo, createPromo, editPromo, deletePromo, togglePromoStatus } = require("../controllers/promoControllers")
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/", getPromo);
router.post("/", verifyAdmin, createPromo);
router.put("/:id", verifyAdmin, editPromo);
router.delete("/:id", verifyAdmin, deletePromo);
router.patch("/:id", verifyAdmin, togglePromoStatus);

module.exports = router;