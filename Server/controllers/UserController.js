import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER LOGIC
export const register = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    if (!email || !username || !password || !confirmPassword) {
      return res.status(400).json({ message: "Enter all the required fields", success: false });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password and confirm password do not match", success: false });
    }

    const usernameRegex = /^[a-z0-9][a-z0-9!@#$%^&*()_+=-]{7,}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message: "Username must be at least 8 characters and start with lowercase/number",
        success: false,
      });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: "Password must include uppercase, lowercase, number, and special character",
        success: false,
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ message: "Email already registered", success: false });

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ message: "Username already taken", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, username, password: hashedPassword });

    return res.status(201).json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error during registration", success: false });
  }
};

//LOGIN LOGIC
export const login = async (req, res) => 
{
  try 
  {
    const { identifier, password } = req.body; // 'identifier' can be email or username

    if (!identifier || !password) 
    {
      return res.status(400).json
      ({
        message: "Enter all the required fields",
        success: false,
      });
    }

    // Find user by email or username
    let user = await User.findOne
    ({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) 
    {
      return res.status(400).json
      ({
        message: "Incorrect email/username or password",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) 
    {
      return res.status(400).json
      ({
        message: "Incorrect email/username or password",
        success: false,
      });
    }

    const tokenData = 
    {
      userId: user._id,
    };

    const token = await jwt.sign
    (tokenData, process.env.SECRET_KEY,
    {
      expiresIn: "7d",
    });

    const userData = 
    {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "Lax",
        secure: false,
      })
      .json({
        message: `Welcome back ${user.username}!`,
        user: userData,
        token: token, // <-- Add this line
        success: true,
      });

  } 
  catch (error) 
  {
    console.error(error);
    return res.status(500).json
    ({
      message: "Server error during login",
      success: false,
    });
  }
};


//LOGOUT LOGIC
export const logout = async (req, res) => 
{
  try 
  {
    return res.status(200).cookie("token", { maxAge: 0 }).json
    ({
      message: "Logged out successfully",
      success: true,
    });
  } 
  catch (error) 
  {
    console.log(error);
  }
};


//UPDATE LOGIC
export const updateProfile = async (req, res) => {
  try {
    const { email, username, password: newPassword, currentPassword } = req.body;
    const userId = req.id; // from auth middleware

    if (!currentPassword) {
      return res.status(400).json({
        message: "Current password is required to update profile.",
        success: false,
      });
    }

    let user = await User.findById(userId).select("+password"); // Ensure password is selected
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect current password",
        success: false,
      });
    }

    // Update fields if correct password
    if (username) user.username = username;
    if (email) user.email = email;
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    const userData = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      user: userData,
      success: true,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Server error during profile update",
      success: false,
    });
  }
};