import { comparePassword } from "../utils/password.js";
import UserModel from "../models/user.js";
import makeValidation from "@withvoid/make-validation";
import publicUser from "../utils/publicUser.js";

const login = async (req, res) => {
  try {
    const validation = makeValidation((types) => ({
      payload: req.body,
      checks: {
        email: { type: types.string },
        password: { type: types.string },
      },
    }));

    if (!validation.success) return res.status(400).json(validation);

    const { password, email } = req.body;

    console.log(req.body);

    const user = await UserModel.getUserByEmail(email);

    const isPasswordCorrect = await comparePassword(password, user.password);

    if (isPasswordCorrect) {
      return res.status(200).json({
        success: true,
        authorization: req.authToken,
        userId: user._id,
        user: publicUser(user),
      });
    } else {
      return res.status(400).json({ success: false, message: "User password is not correct" });
    }
    return isPasswordCorrect;
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export default { login };
