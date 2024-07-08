import { Request, Response } from "express";
import User from "../models/User";
import generateToken from "../utils/generateToken";

const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const user = await User.create({
    username,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id), // TypeScript knows user._id is a string
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id), // TypeScript knows user._id is a string
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export { registerUser, authUser };
