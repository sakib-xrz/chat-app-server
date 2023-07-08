const User = require("../models/user.Model");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../helpers/jwtHelpers");

const access_token = process.env.ACCESS_TOKEN_SECRET;
const access_expires = process.env.ACCESS_TOKEN_EXPIRES_IN;
const refresh_token = process.env.REFRESH_TOKEN_SECRET;
const refresh_expires = process.env.REFRESH_TOKEN_EXPIRES_IN;

const env = process.env.NODE_ENV;

const loginUser = asyncHandler(async (req, res) => {
    const { email: male, password } = req.body;

    if (!male || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const userExists = await User.findOne({ email: male });

    if (!userExists) {
        res.status(400);
        throw new Error("User does not exists");
    }

    const isPasswordMatched = await bcrypt.compare(
        password,
        userExists.password
    );

    if (!isPasswordMatched) {
        res.status(400);
        throw new Error("Incorrect password");
    }

    const { _id, name, email, gender, image, isAdmin, createdAt, updatedAt } =
        userExists;

    const accessToken = jwtHelpers.createToken(
        { _id, email, isAdmin },
        access_token,
        access_expires
    );

    const refreshToken = jwtHelpers.createToken(
        { _id, email, isAdmin },
        refresh_token,
        refresh_expires
    );

    const cookieOptions = {
        secure: env === "production",
        httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            _id,
            name,
            email,
            gender,
            image,
            isAdmin,
            createdAt,
            updatedAt,
        },
        accessToken,
    });
});

const refreshToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;

    let verifiedToken = null;

    try {
        verifiedToken = jwtHelpers.verifyToken(refreshToken, refresh_token);
    } catch (err) {
        res.status(403);
        throw new Error("Invalid Refresh Token");
    }

    const { _id, email, isAdmin } = verifiedToken;

    const userExists = await User.findOne({ email });

    if (!userExists) {
        res.status(400);
        throw new Error("User does not exists");
    }

    const newAccessToken = jwtHelpers.createToken(
        {
            _id,
            email,
            isAdmin,
        },
        access_token,
        access_expires
    );

    const cookieOptions = {
        secure: env === "production",
        httpOnly: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken: newAccessToken,
    });
});

module.exports = { loginUser, refreshToken };
