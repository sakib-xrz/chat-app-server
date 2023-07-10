const express = require("express");
const AuthRoute = require("./AuthRoute");
const UserRoute = require("./UserRoute");
const ChatRoute = require("./chatRoute");

const router = express.Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoute,
    },
    {
        path: "/users",
        route: UserRoute,
    },
    {
        path: "/chats",
        route: ChatRoute,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
