const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const saltRounds = process.env.SALT_ROUNDS;

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, gender, image } = req.body;

    if (!name || !email || !password || !gender) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const hashedPass = await bcrypt.hash(password, Number(saltRounds));

    const user = await User.create({
        name,
        email,
        password: hashedPass,
        gender,
        image,
    });

    if (user) {
        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                image: user.image,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } else {
        res.status(400);
        throw new Error("Failed to create user");
    }
});

const getUser = asyncHandler(async (req, res) => {
    const searchTerm = req.query.search
        ? {
              $or: [
                  { name: { $regex: req.query.search, $options: "i" } },
                  { email: { $regex: req.query.search, $options: "i" } },
              ],
          }
        : {};

    const users = await User.find(searchTerm).find({
        _id: { $ne: req.user._id },
    });

    res.status(201).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
    });
});

module.exports = { registerUser, getUser };
