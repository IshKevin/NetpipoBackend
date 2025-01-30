
import dotenv from 'dotenv';

dotenv.config();


export const DATABASE_URL = process.env.DATABASE_URL;


export const JWT_SECRET = process.env.JWT_SECRET || '389e7b696f50a17a665d5793b9a03329454509aca54d94de8bb37dcecc8d8edf';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';


export const PORT = process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'development';

export const BCRYPT_SALT_ROUNDS = 10;


export const API_PREFIX = '/api/v1';


export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;
export const NAME_MAX_LENGTH = 100;
export const EMAIL_MAX_LENGTH = 255;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_REQUESTS = 100;


export const ERROR_MESSAGES = {
  DATABASE_CONNECTION: 'Unable to connect to the database',
  UNAUTHORIZED: 'Unauthorized access',
  INVALID_TOKEN: 'Invalid or expired token',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Internal server error',
  DUPLICATE_EMAIL: 'Email already exists',
};