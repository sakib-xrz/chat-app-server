import User from "../model/user.model.js";

export const getAllUser = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({
      message: "Users retrieved successfully",
      data: filteredUsers,
    });
  } catch (error) {
    console.error("Error from get all user controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const me = req.user._id;

    const filteredUsers = await User.find({
      _id: { $eq: me },
    }).select("-password");

    res.status(200).json({
      message: "My data retrieved successfully",
      data: filteredUsers,
    });
  } catch (error) {
    console.error("Error from get me controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
