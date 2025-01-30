import request from 'supertest';
import app from '../src/app';
import { AuthController } from '../src/controllers/auth.controller';
import { db } from '../src/config/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../src/config/database');

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(() => {
    authController = new AuthController();
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const req = {
          body: {
              email: 'test@example.com',
              password: 'password123',
          },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      await authController.register(req, res);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com' }));
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      const req = {
          body: {
              email: 'test@example.com',
              password: 'password123',
          },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (db.select as jest.Mock).mockResolvedValueOnce([{ id: 1, email: 'test@example.com', password: 'hashedPassword' }]);

      (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

      await authController.login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' }, expect.anything(), { expiresIn: '1h' });
      expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken' });
    });

    it('should return 401 with invalid credentials', async () => {
      const req = {
          body: {
              email: 'test@example.com',
              password: 'wrongPassword',
          },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (db.select as jest.Mock).mockResolvedValueOnce([]);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });
  });
});