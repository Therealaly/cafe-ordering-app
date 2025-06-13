const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const ResetToken = require("../models/resetToken")
const crypto = require("crypto");

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
};

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data user", error: err.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      email
    });
    res.status(200).json(user);
    if (!user) {
      console.log("Password reset attempt for non-existent user:", email);
      return res.status(200).json({ message: "Jika email terdaftar, link reset password telah dikirimkan" });
    }

  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data user", error: err.message });
  }
}

const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email
    });
    if (!user) {
      console.log("Password reset attempt for non-existent user:", email);
      return res.status(200).json({ message: "Jika email terdaftar, link reset password telah dikirimkan" });
    }

    await ResetToken.deleteMany({ userId: user._id });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    const simpleToken = crypto.randomBytes(32).toString('hex') 

    // generate token dan save di db utk auth reset token
    const signedJwtToken = jwt.sign(
      { id: user._id, email: user.email, token: simpleToken},
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    const resetToken = new ResetToken({
      userId: user._id,
      token: signedJwtToken,
    })
    await resetToken.save()

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${user._id}/${signedJwtToken}`;

    const mailOption = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Warna Kopi Cafe'}" <${process.env.EMAIL_USER}>`, // Optional: Add a "From" name
      to: email,
      subject: 'Link Reset Password akun Warna Kopi Anda',
      html: `
       <!DOCTYPE html>
          <html>
          <body style="text-align: center; font-family: 'Verdana', sans-serif; color: #333; line-height: 1.6;">
            <div
              style="
                max-width: 500px;
                margin: 20px auto;
                background-color: #f9f9f9;
                padding: 30px;
                border-radius: 12px;
                border: 1px solid #eee;
              "
            >
              <img src="https://ik.imagekit.io/k9csxbksz/logo%20hijau.png?updatedAt=1748360521163" alt="Warna Kopi Logo" style="max-width: 100px; margin-bottom: 20px;">
              <h2 style="color: #2c5236; margin-bottom: 20px;">Reset Password Anda</h2>
              <p style="text-align: left; margin-bottom: 20px;">
                Halo ${user.name},
              </p>
              <p style="text-align: left; margin-bottom: 25px;">
                Kami menerima permintaan untuk mereset password akun Anda. Jika Anda tidak memintanya, silakan abaikan email ini.
                Untuk melanjutkan, klik tombol di bawah ini:
              </p>
              <a href="${resetLink}" target="_blank" style="text-decoration: none;">
                <button
                  style="
                    background-color: #2c5236; /* Warna Kopi Green */
                    border: none;
                    padding: 12px 25px;
                    border-radius: 8px;
                    color: #ffffff;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                  "
                  onmouseover="this.style.backgroundColor='#1e3923'"
                  onmouseout="this.style.backgroundColor='#2c5236'"
                >
                  Reset Password
                </button>
              </a>
              <p style="text-align: left; margin-top: 30px; font-size: 14px;">
              Jika tombol di atas tidak berfungsi, salin dan tempel URL berikut ke browser Anda:
              </p>
              <p style="margin: 0px; text-align: left; font-size: 12px; word-break: break-all;">
                <a href="${resetLink}" target="_blank" style="color: #2c5236; text-decoration: underline;">
                    ${resetLink}
                </a>
              </p>
              <p style="text-align: left; margin-top: 25px; font-size: 12px; color: #777;">
                Link ini akan kedaluwarsa dalam 15 menit.
              </p>
            </div>
            <p style="font-size: 12px; color: #999; margin-top: 20px;">
              &copy; ${new Date().getFullYear()} Warna Kopi Cafe. All rights reserved.
            </p>
          </body>
        </html>
      `
    };


    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Gagal mengirim email reset password", error: error.message });
      }
      res.status(200).json({ message: "Email reset password berhasil dikirim" });
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengirim email reset password", error: err.message });
  };
};
  
const resetPassword = async (req, res) => {
  const { userId, urlToken } = req.params;
  const { newPassword } = req.body;
  try {
    let decodedJwtPayload;
    try {
      decodedJwtPayload = jwt.verify(urlToken, process.env.JWT_SECRET);
    } catch (jwtError) {
      console.log("JWT Verification Error:", jwtError)
      return res.status(400).json({ message: "Link reset password tidak valid atau telah kedaluwarsa" });
    }

    if (decodedJwtPayload.id !== userId) {
      return res.status(400).json({ message: "Link reset password tidak valid." });
    }

    const resetTokenDoc = await ResetToken.findOne({ userId, token: urlToken });
    if (!resetTokenDoc) {
      return res.status(400).json({ message: "Link reset password tidak valid atau sudah digunakan" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    if (newPassword.length < 6) { // Basic password validation
        return res.status(400).json({ message: "Password minimal harus 6 karakter." });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password); 
    if (isSamePassword) {
      return res.status(400).json({ message: "Password baru tidak boleh sama dengan password lama." });
    }

    // Enkripsi password baru
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // Hapus token reset setelah digunakan
    await ResetToken.deleteOne({ _id: resetTokenDoc._id });

    res.status(200).json({ message: "Password berhasil direset" });
  } catch (err) {
    res.status(500).json({ message: "Gagal reset password", error: err.message });
  }
}

module.exports = { registerUser, loginUser, deleteUser, editRole, getUser, getUserByEmail, resetPassword, sendResetPasswordEmail };
