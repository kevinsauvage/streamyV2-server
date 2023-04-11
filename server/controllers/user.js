import makeValidation from '@withvoid/make-validation';

import UserModel from '../models/user.js';
import publicUser from '../utils/publicUser.js';

const getAllUsers = async (_, response) => {
  try {
    const users = await UserModel.getUsers();
    return response.status(200).json({ success: true, users });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

const getUserById = async (request, response) => {
  try {
    const user = await UserModel.getUserById(request.params.id);
    return response.status(200).json({ success: true, user: publicUser(user) });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

const createUser = async (request, response) => {
  try {
    const validation = makeValidation((types) => ({
      checks: {
        email: { type: types.string },
        firstName: { type: types.string },
        lastName: { type: types.string },
        password: { type: types.string },
      },
      payload: request.body,
    }));
    if (!validation.success) return response.status(400).json(validation);
    const { firstName, lastName, email, password } = request.body;
    const user = await UserModel.createUser(firstName, lastName, email, password);
    return response.status(200).json({ success: true, user: publicUser(user) });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

const updateUserById = async (request, response) => {
  try {
    const { firstName, lastName, email, savedMovies } = request.body;
    const { id } = request.params;
    const user = await UserModel.updateUser(firstName, lastName, email, savedMovies, id);
    return response.status(200).json({ success: true, user: publicUser(user) });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

const deleteUserById = async (request, response) => {
  try {
    const user = await UserModel.deleteByUserById(request.params.id);
    return response.status(200).json({
      message: `Deleted a count of ${user.deletedCount} user.`,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

export default { createUser, deleteUserById, getAllUsers, getUserById, updateUserById };
