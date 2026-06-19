import pool from "../../database/index.js";
import type { RegisterDTO, User } from "./auth.types.js";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0] || null;
};

export const createUser = async (
  data: RegisterDTO,
  passwordHash: string,
): Promise<User> => {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, first_name, last_name)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [data.email, passwordHash, data.first_name, data.last_name],
  );

  return result.rows[0];
};

export const saveRefreshToken = async (
  userId: string,
  token: string,
  expiresAt: Date,
) => {
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, token, expiresAt],
  );
};

export const findRefreshToken = async (token: string) => {
  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1`,
    [token],
  );

  return result.rows[0] || null;
};

export const revokeRefreshToken = async (token: string) => {
  await pool.query(
    `UPDATE refresh_tokens
     SET is_revoked = true
     WHERE token = $1`,
    [token],
  );
};

export const revokeAllUserTokens = async (userId: string) => {
  await pool.query(
    `UPDATE refresh_tokens
     SET is_revoked = true
     WHERE user_id = $1`,
    [userId],
  );
};