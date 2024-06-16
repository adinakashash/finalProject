const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const mongoose=require("mongoose")

exports.signup = async (userData) => {
  try {
    const { name, email, phone, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('Email exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      name,
      email,
      phone,
      password: hashedPassword
    });

    const result = await newUser.save();
    console.log(result);
    return { message: 'User created' };
  } catch (error) {
    console.error("Failed to add user:", error);
    throw new Error("Failed to add user");
  }
};

exports.login = async (userData) => {
  const { email, password, remember } = userData;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('No account with this email has been registered.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials.');
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: remember ? '365d' : '24h' }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    console.error("Login failed:", error);
    throw new Error("Login failed");
  }
};

exports.deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Failed to delete user");
  }
};

exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    console.error("Failed to get users:", error);
    throw new Error("Failed to get users");
  }
};

exports.updateUser = async (userId, updateData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!updatedUser) {
      throw new Error("User not found");
    }
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Failed to update user");
  }
};

exports.getUserByName = async (name) => {
  try {
    const user = await User.findOne({ name });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw new Error("Failed to get user");
  }
};
