import { AuthController } from '../src/controllers/auth.controller';
import { db } from '../src/config/database'; // Import the db mock
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('../src/config/database'); // Mock the db
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('AuthController', () => {
  let authController: AuthController;
  let req: any;
  let res: any;

  beforeEach(() => {
    authController = new AuthController();
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('register', () => {
    it('should register a new user', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (db.insert as jest.Mock).mockResolvedValue([{ id: 1, email: 'test@example.com', password: 'hashedPassword' }]);

      await authController.register(req, res);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ email: 'test@example.com' }));
    });

    it('should return 500 if registration fails', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hashing failed'));

      await authController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error creating account', error: expect.anything() });
    });
  });

  describe('login', () => {
    it('should login with valid credentials', async () => {
      req.body = { email: 'test@example.com', password: 'password123' };
      (db.select as jest.Mock).mockResolvedValue([{ id: 1, email: 'test@example.com', password: 'hashedPassword' }]);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

      await authController.login(req, res);

      expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' }, expect.anything(), { expiresIn: '1h' });
      expect(res.json).toHaveBeenCalledWith({ token: 'mockedToken' });
    });

    it('should return 401 with invalid credentials', async () => {
      req.body = { email: 'test@example.com', password: 'wrongPassword' };
      (db.select as jest.Mock).mockResolvedValue([]);

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    });
  });
});