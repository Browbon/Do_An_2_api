import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

//CREATE NEW USER
export const register = async (req, res, next) => {
  //HASH PASSWORD
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(req.body.password, salt);

  const newUser = new User({
    ...req.body,
    password: hashPassword,
  });

  try {
    await newUser.save();
    return res.status(200).json("User has been created!");
  } catch (error) {
    next(error);
  }
};

//LOGIN
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return next(createError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    //JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );

    const { password, isAdmin, ...others } = user._doc;
    return res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ details: { ...others }, isAdmin });
  } catch (error) {
    next(error);
  }
};
