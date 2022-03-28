import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

const SECRET_KEY = Buffer.from(process.env.JWT_SECRET).toString("base64");

export const encode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await UserModel.getUserByEmail(email);

    const authToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "7d" });

    req.authToken = authToken;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: error.error });
  }
};

export const decode = (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(400).json({ success: false, message: "No access token provided" });
  }

  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: error.message });
  }
};
