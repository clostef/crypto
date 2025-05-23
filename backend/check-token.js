import { CodeError } from './code-error.js';
import fs from 'fs';
import path from 'path';

export const checkToken = (req) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    throw new CodeError('Missing bearer token', 401);
  }

  const dbFilePath = path.join(process.cwd(), 'backend/db.json');
  const db = JSON.parse(fs.readFileSync(dbFilePath, 'UTF-8'));
  const user = db.users.find((user) => user.token === token);

  if (!user) {
    throw new CodeError('Invalid token or user not found', 401);
  }

  return {
    db,
    userId: user.id,
  };
};
