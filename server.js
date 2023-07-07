const mongoose = require("mongoose");
const { app } = require("./app");

const db_uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const main = async () => {
    try {
        await mongoose.connect(db_uri);
        console.log("🎯 Database is connected successfully");
        app.listen(port, () => {
            console.log(`✅ Application  listening on port ${port}`);
        });
    } catch (error) {
        console.log("❌ Failed to connect database", error);
    }
};

main();
