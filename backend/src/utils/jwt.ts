import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

// generate
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId }, ACCESS_SECRET, { expiresIn: "10s" });
};

import { randomUUID } from "crypto";

export const generateRefreshToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
      tokenId: randomUUID(),
    },
    REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );
};

// verify
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
