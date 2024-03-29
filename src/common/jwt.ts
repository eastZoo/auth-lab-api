import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const ACCESS_TOKEN_EXPIRES = {
  expiresIn: '6h',
};
const REFRESH_TOKEN_EXPIRES = {
  expiresIn: '30d',
};

export const createAccessToken = (payload: any) => {
  return jwt.sign(payload, process.env.JWT_SECRET, ACCESS_TOKEN_EXPIRES);
};

export const createRefreshToken = (payload: any) => {
  return jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET,
    REFRESH_TOKEN_EXPIRES,
  );
};
