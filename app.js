const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const router = require("./routes/index");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// application route
app.use('/api/v1', router)

// Error Handling middleware
app.use(notFound);
app.use(errorHandler);

module.exports = { app };

