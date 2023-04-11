import express from 'express';

import auth from '../controllers/auth.js';
import user from '../controllers/user.js';
import { encode } from '../middlewares/jwt.js';

const router = express.Router();

router.post('/login', encode, auth.login);

router.post('/register', user.createUser);

export default router;
