// utils
import makeValidation from "@withvoid/make-validation";
// models
import UserModel from "../models/user.js";
import publicUser from "../utils/publicUser.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getUsers();
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.getUserById(req.params.id);
    return res.status(200).json({ success: true, user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const createUser = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        firstName: { type: types.string },
        lastName: { type: types.string },
        email: { type: types.string },
        password: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(400).json(validation);

    const { firstName, lastName, email, password } = req.body;

    const user = await UserModel.createUser(firstName, lastName, email, password);
    return res.status(200).json({ success: true, user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { firstName, lastName, email, savedMovies } = req.body;

    const { id } = req.params;

    const user = await UserModel.updateUser(firstName, lastName, email, savedMovies, id);

    return res.status(200).json({ success: true, user: publicUser(user) });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await UserModel.deleteByUserById(req.params.id);
    return res.status(200).json({
      success: true,
      message: `Deleted a count of ${user.deletedCount} user.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export default { getAllUsers, getUserById, createUser, deleteUserById, updateUserById };
