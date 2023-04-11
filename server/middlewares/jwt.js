import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';

const SECRET_KEY = Buffer.from(process.env.JWT_SECRET).toString('base64');

export const encode = async (request, response, next) => {
  console.log('🚀 ~  file: jwt.js:9 ~  encode ~  encode:');

  try {
    const { email } = request.body;
    console.log('get user');
    const user = await UserModel.getUserByEmail(email);

    if (!user?._id) {
      response
        .status(404)
        .json({ message: 'Error: No user found with this email', success: false });
    }

    console.log('🚀 ~  file: jwt.js:14 ~  encode ~  user:', user);

    const authToken = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '7d' });

    console.log('🚀 ~  file: jwt.js:15 ~  encode ~  authToken:', authToken);

    request.authToken = authToken;
    console.log('next');
    next();
  } catch (error) {
    return response.status(400).send({ message: error.toString(), success: false });
  }
};

export const decode = (request, response, next) => {
  const accessToken = request.headers.authorization.split(' ')[1];
  if (!accessToken) {
    return response.status(400).json({ message: 'No access token provided', success: false });
  }

  try {
    const decoded = jwt.verify(accessToken, SECRET_KEY);
    request.userId = decoded.userId;
    return next();
  } catch (error) {
    return response.status(401).json({ message: error.message, success: false });
  }
};
