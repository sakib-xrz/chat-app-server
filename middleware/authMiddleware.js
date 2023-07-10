const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwtHelpers = require("../helpers/jwtHelpers");

const auth = asyncHandler(async (req, res, next) => {
    let token;
    const access_token = process.env.ACCESS_TOKEN_SECRET;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //decodes token id
            const decoded = jwtHelpers.verifyToken(token, access_token);

            req.user = await User.findById(decoded._id).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("You are not authorized");
        }
    }

    if (!token) {
        res.status(403);
        throw new Error("Forbidden access");
    }
});

module.exports = { auth };
