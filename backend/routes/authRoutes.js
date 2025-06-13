const express = require('express');
const router = express.Router();
const { registerUser, loginUser, deleteUser, editRole, getUser, getUserByEmail, resetPassword, sendResetPasswordEmail } = require('../controllers/authController');
const verifyAdmin = require('../middleware/verifyAdmin');


router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', verifyAdmin, deleteUser);
router.put('/:id', verifyAdmin, editRole)
router.get('/', verifyAdmin, getUser);
router.get('/:email', getUserByEmail)
router.post('/send-reset-password', sendResetPasswordEmail);
router.post('/reset-password/:userId/:urlToken', resetPassword);


module.exports = router;
