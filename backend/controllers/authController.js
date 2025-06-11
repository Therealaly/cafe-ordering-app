const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Cek user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user ke database
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "Registrasi berhasil", userId: newUser._id });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan saat registrasi", error: err.message });
  }
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if ( !user ) {
      return res.status(400).json({ message: "Email tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if ( !isMatch ) {
      return res.status(400).json({ message: "Password salah" });
    }

    //JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn:  "3h"}
    );

    res.status(200).json({
      message: "Login berhasil",
      token,
      user : {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })
  } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    resstatus(200).json({ message: `User ${User.name} berhasil dihapus` });
  } catch (err) {
    res.status(500).json({ message: "Gagal menghapus user", error: err.message });
  }
  
}

const editRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role: newRole } = req.body;
    const requestingUser = req.user;
    
    const validRoles = ['user', 'kasir', 'admin'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Role tidak valid.' });
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User tidak ditemukan.' });
    }

    if (newRole === 'admin') {
      if (requestingUser.role !== 'superadmin') {
        return res.status(403).json({ message: 'Akses ditolak: Hanya Superadmin yang dapat mengangkat role menjadi Admin.' });
      }
    } 
    // --- Admin Check for changing between 'user' and 'kasir' ---
    // else if (newRole === 'user' || newRole === 'kasir') {
     
    // } 
    userToUpdate.role = newRole;
    await userToUpdate.save();


    res.status(200).json({ message: `Role user ${userToUpdate.name} berhasil diupdate menjadi ${userToUpdate.role}`, user: userToUpdate });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengupdate role user", error: err.message });
  }
}

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data user", error: err.message });
  }
}

module.exports = { registerUser, loginUser, deleteUser, editRole, getUser };
