const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const { chats } = require("./data/data");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Chat Application!");
});

app.get("/api/v1/chats", (req, res) => {
    res.send(chats);
});

app.get("/api/v1/chats/:id", (req, res) => {
    const { id } = req.params;
    res.send(chats.find((chat) => chat?._id === id));
});

module.exports = { app };

