import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import generateToken from "../utils/generateJwt.js";

export const signUp = async (req, res) => {
  try {
    const { name, username, password, gender } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    const boyProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
      gender,
      photo: gender === "male" ? boyProfilePhoto : girlProfilePhoto,
    });

    const savedUser = await newUser.save();

    if (savedUser) {
      const token = generateToken(savedUser._id, res);

      return res.status(201).json({
        message: "User created successfully",
        data: {
          access: token,
        },
      });
    } else {
      return res.status(400).json({
        error: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error while creating user", error.message);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUserAlreadyExists = await User.findOne({ username });

    if (!isUserAlreadyExists) {
      res.status(400).json({
        error: "User does not exist",
      });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        isUserAlreadyExists.password || ""
      );

      if (!isPasswordCorrect) {
        res.status(400).json({
          error: "Invalid username or password",
        });
      } else {
        const token = generateToken(isUserAlreadyExists._id, res);

        const data = isUserAlreadyExists.toObject();
        delete data.password;

        res.status(200).json({
          message: "Login successful",
          data: {
            access: token,
          },
        });
      }
    }
  } catch (error) {
    console.log("Error while logged in user", error.message);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
