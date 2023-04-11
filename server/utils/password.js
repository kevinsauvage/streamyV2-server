import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password) => bcrypt.hash(password, saltRounds);

export const comparePassword = async (password, hash) => bcrypt.compare(password, hash);
