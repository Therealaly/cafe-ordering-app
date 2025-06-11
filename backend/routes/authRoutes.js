const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, editRole, getUser } = require('../controllers/authController');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', verifyAdmin, deleteUser);
router.put('/:id', verifyAdmin, editRole)
router.get('/', verifyAdmin, getUser);


module.exports = router;
