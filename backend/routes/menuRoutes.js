const express = require('express');
const router = express.Router();
const { getMenus, createMenu, deleteMenu, editMenu } = require("../controllers/menuControllers")
const verifyAdmin = require("../middleware/verifyAdmin");

router.get("/", getMenus);
router.post("/", verifyAdmin, createMenu);
router.delete("/:id", verifyAdmin, deleteMenu);
router.put("/:id", verifyAdmin, editMenu);

module.exports = router;