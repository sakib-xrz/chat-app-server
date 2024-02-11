import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
import connectToDatabase from "./database/connectToDatabase.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", router);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Api Not Found",
  });
  next();
});

server.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is listening on ${PORT}`);
});
