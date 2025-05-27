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
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn:  "1d"}
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

module.exports = { registerUser, loginUser };
