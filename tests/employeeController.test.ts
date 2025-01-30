import request from 'supertest';
import app from '../src/app';
import { EmployeeController } from '../src/controllers/employee.controller';
import { db } from '../src/config/database';
import { Request, Response } from 'express';

jest.mock('../src/config/database');

describe('EmployeeController', () => {
  let employeeController: EmployeeController;

  beforeEach(() => {
    employeeController = new EmployeeController();
    jest.clearAllMocks();
  });

  describe('createEmployee', () => {
    it('should create a new employee', async () => {
      const req = {
          body: {
              name: 'John Doe',
              email: 'john.doe@example.com',
              position: 'Software Engineer',
              salary: 80000,
          },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (db.insert as jest.Mock).mockResolvedValueOnce({ id: 1, name: 'John Doe' });

      await employeeController.createEmployee(req, res);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'John Doe' }));
    });
  });

  describe('getAllEmployees', () => {
    it('should fetch all employees', async () => {
      const req = {} as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;

      (db.select as jest.Mock).mockResolvedValueOnce([{ id: 1, name: 'John Doe' }]);

      await employeeController.getAllEmployees(req, res);

      expect(db.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ id: 1, name: 'John Doe' }]);
    });
  });

  describe('getEmployeeById', () => {
    it('should fetch an employee by ID', async () => {
      const req = {
        params: { id: '1' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (db.select as jest.Mock).mockResolvedValueOnce([{ id: 1, name: 'John Doe' }]);

      await employeeController.getEmployeeById(req, res);

      expect(db.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'John Doe' });
    });

    it('should return 404 if employee ID does not exist', async () => {
      const req = {
        params: { id: '999' },
      } as unknown as Request;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;

      (db.select as jest.Mock).mockResolvedValueOnce([]);

      await employeeController.getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });
  });
});