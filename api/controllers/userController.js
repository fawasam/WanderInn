const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const twilioClient = require("../utils/services");
const { sendEmailRegister } = require("../helpers/sendMail");
const generateToken = require("../utils/generateToken");
// @desc    Register new user
// @route   POST /api/users
// @access  Public

const registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    // Check all fields are valid
    if (!username || !email || !password || !phone) {
      res.status(400).json({
        message: "Please add all fields",
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        message: "User already exists",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in the database
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    await newUser.save();

    // Generate email verification token
    const emailVerificationToken = generateToken(res, user._id);

    // Generate SMS verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    newUser.verificationCode = verificationCode;
    await newUser.save();

    // Send verification email

    const url = `${process.env.FRONTEND_URL}/user/activate/${emailVerificationToken}`;
    sendEmailRegister(username, email, url, "Verify your email");

    // Send verification SMS
    await twilioClient.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      to: "+" + phone,
      from: process.env.FROM_PHONE_NUMBER,
    });
    res.status(201).json({
      message:
        "Registration successful. Please check your email and phone for verification.",
      requireVerification: newUser.isPhoneVerified,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json({ message: "Registration failed. Please try again later." });
  }
};

// @desc    Verify email new user
// @route   POST /api/users/verify-email/:token
// @access  Private

const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SIGN);
    const userId = decodedToken.userId;
    // Update the user's email verification status in the database
    await User.findByIdAndUpdate(userId, { isEmailVerified: true });
    res.redirect("http://your-frontend-url/email-verified");
  } catch (err) {
    console.error("Email verification error:", err);
    res.redirect("http://your-frontend-url/email-verification-failed");
  }
};

// @desc    Verify sms new user
// @route   POST /api/users/verify-sms
// @access  Private

const verifySms = async (req, res) => {
  const { phone, verificationCode } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    if (verificationCode === user.verificationCode) {
      user.isPhoneVerified = true;
      await user.save();
      res.status(200).json({ message: "Phone number verified successfully." });
    } else {
      res.status(400).json({ message: "Invalid verification code." });
    }
  } catch (err) {
    console.error("SMS verification error:", err);
    res.status(400).json({ message: "Invalid verification code." });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const getMe = async (req, res) => {
  const { token } = req.cookie;
  res.json({ token });

  try {
  } catch (error) {
    console.error(err);
    // res.status(500).json({ message: "Login failed. Please try again later." });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  registerUser,
  logoutUser,
  verifyEmail,
  verifySms,
  loginUser,
  getMe,
  getUserProfile,
  updateUserProfile,
};
