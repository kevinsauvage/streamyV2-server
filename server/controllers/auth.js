import makeValidation from '@withvoid/make-validation';

import UserModel from '../models/user.js';
import { comparePassword } from '../utils/password.js';
import publicUser from '../utils/publicUser.js';

const login = async (request, response) => {
  try {
    const validation = makeValidation((types) => ({
      checks: { email: { type: types.string }, password: { type: types.string } },
      payload: request.body,
    }));

    if (!validation.success) return response.status(400).json(validation);
    const { password, email } = request.body;
    const user = await UserModel.getUserByEmail(email);

    const isPasswordCorrect = await comparePassword(password, user.password);

    return isPasswordCorrect
      ? response.status(200).json({
          authorization: request.authToken,
          success: true,
          user: publicUser(user),
          userId: user._id,
        })
      : response.status(400).json({ message: 'User password is not correct', success: false });
  } catch (error) {
    return response.status(500).json({ error, success: false });
  }
};

export default { login };
