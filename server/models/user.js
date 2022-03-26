import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { hashPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    savedMovies: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.statics.createUser = async function (firstName, lastName, email, password) {
  try {
    const hash = await hashPassword(password);

    const user = await this.create({ firstName, lastName, email, password: hash });
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.updateUser = async function (firstName, lastName, email, savedMovies, id) {
  try {
    const object = {};

    if (firstName) object.firstName = firstName;
    if (lastName) object.lastName = lastName;
    if (email) object.email = email;
    if (savedMovies) object.savedMovies = savedMovies;

    const user = await this.findByIdAndUpdate({ _id: id }, object, { new: true });

    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUserByEmail = async function (email) {
  try {
    const user = await this.findOne({ email: email });
    console.log("user", user);
    if (!user) throw { error: "No user found with this email" };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.getUsers = async function () {
  try {
    const users = await this.find();
    return users;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.deleteByUserById = async function (id) {
  try {
    const result = await this.remove({ _id: id });
    return result;
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("User", userSchema);
