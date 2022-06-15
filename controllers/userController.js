import User from "../models/User.js";

//UPDATE BY ID
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};

//DELETE BY ID
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findById(req.params.id);
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json(`${deletedUser.name} has been deleted!`);
  } catch (error) {
    next(error);
  }
};

//GET BY ID
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//GET ALL USERS
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
