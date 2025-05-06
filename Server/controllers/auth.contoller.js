import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 Generate Access Token
const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

// 🔁 Generate Refresh Token
const createRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// ✅ REGISTER & Auto-Login
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name,email,password)
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res
      .status(400)
      .json({
        msg: "User already exists"
      });

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log(hashedPassword);
    const newUser = await User.create({ name, email, password: hashedPassword });

    // console.log("newUser:",newUser);
    const accessToken = createAccessToken(newUser._id);
    const refreshToken = createRefreshToken(newUser._id);
    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/auth/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({ accessToken, user: { name: newUser.name, email: newUser.email } });

  } catch (err) {
    // console.error("Register Error:", err);
    res.status(500).json({ msg: "Register failed", error: err.message });
  }

};

// 🔐 LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res
      .status(400)
      .json({
        msg: "Invalid credentials"
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res
      .status(400)
      .json({
        msg: "Invalid credentials"
      });

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/auth/refresh-token",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, user: { name: user.name, email: user.email }, message: "logged in successfully" });

  } catch (err) {
    res.status(500)
      .json({
        msg: "Login failed"
      });
  }
};

// 🔄 REFRESH TOKEN
export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ msg: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ msg: "Invalid refresh token" });
    }

    const newAccessToken = createAccessToken(user._id);

    // Return both token and user data
    res.json({
      accessToken: newAccessToken,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id
      }
    });

  } catch (err) {
    res.status(403).json({ msg: "Token expired or invalid" });
  }
};
// 🚪 LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      path: "/api/auth/refresh-token",
    });
    res.status(200).json({
      msg: "Logged out"
    });
  } catch (err) {
    res.status(500).json({
      msg: "Logout failed"
    });
  }
};
