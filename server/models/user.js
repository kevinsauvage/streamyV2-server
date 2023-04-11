/* eslint-disable func-names */
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { hashPassword } from '../utils/password.js';

const userSchema = new mongoose.Schema(
  {
    _id: { default: () => uuidv4().replace(/-/g, ''), type: String },
    email: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String,
    savedMovies: { default: [], type: Array },
  },
  { collection: 'users', timestamps: true }
);

userSchema.statics.createUser = async function (firstName, lastName, email, password) {
  const hash = await hashPassword(password);
  return this.create({ email, firstName, lastName, password: hash });
};

userSchema.statics.updateUser = async function (firstName, lastName, email, savedMovies, id) {
  const object = {};
  if (firstName) object.firstName = firstName;
  if (lastName) object.lastName = lastName;
  if (email) object.email = email;
  if (savedMovies) object.savedMovies = savedMovies;
  return this.findByIdAndUpdate({ _id: id }, object, { new: true });
};

userSchema.statics.getUserById = async function (id) {
  const user = await this.findOne({ _id: id });
  if (!user) throw new Error('No user with this id found');
  return user;
};

userSchema.statics.getUserByEmail = async function (email) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('No user found with this email');
  return user;
};

userSchema.statics.getUsers = async function () {
  this.find();
};

userSchema.statics.deleteByUserById = async function (id) {
  this.remove({ _id: id });
};

export default mongoose.model('User', userSchema);
