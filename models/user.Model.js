const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    gender: {
        type: "String",
        enum: ["male", "female"],
        required: true,
    },
    image: {
        type: "String",
        required: true,
        default: function () {
            if (this.gender === "male") {
                return "https://i.ibb.co/fdSq6Zs/male.png";
            } else if (this.gender === "female") {
                return "https://i.ibb.co/yYgyQZN/female.png";
            } else {
                return "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
            }
        },
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
});


const User = mongoose.model("User", userSchema);

module.exports = User;
