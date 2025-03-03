import { generateToken } from "../lib/utils.js";;
import bcrypt from "bcrypt";
import User from "../modals/user.modal.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters" });
    }
    const user = await User.findOne({
      email,
    });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    res.status(500).json({ message: "Internal server  error occured" });
  }
};

export const login = (req, res) => {
  res.send("signup");
};
export const logout = (req, res) => {
  res.send("signup");
};
