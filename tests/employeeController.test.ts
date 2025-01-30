import { EmployeeController } from '../src/controllers/employee.controller';
import { db } from '../src/config/database'; // Import the db mock

jest.mock('../src/config/database'); // Mock the db

describe('EmployeeController', () => {
  let employeeController: EmployeeController;
  let req: any;
  let res: any;

  beforeEach(() => {
    employeeController = new EmployeeController();
    req = {
      body: {},
      params: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('createEmployee', () => {
    it('should create a new employee', async () => {
      req.body = { name: 'John Doe', email: 'john.doe@example.com', position: 'Developer', salary: 50000 };
      (db.insert as jest.Mock).mockResolvedValue([{ id: 1, ...req.body }]);

      await employeeController.createEmployee(req, res);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ name: 'John Doe' }));
    });

    it('should return 500 if employee creation fails', async () => {
      req.body = { name: 'John Doe', email: 'john.doe@example.com', position: 'Developer', salary: 50000 };
      (db.insert as jest.Mock).mockRejectedValue(new Error('Database error'));

      await employeeController.createEmployee(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error creating employee', error: expect.anything() });
    });
  });

  describe('getAllEmployees', () => {
    it('should fetch all employees', async () => {
      const allEmployees = [{ id: 1, name: 'John Doe' }];
      (db.select as jest.Mock).mockResolvedValue(allEmployees);

      await employeeController.getAllEmployees(req, res);

      expect(db.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(allEmployees);
    });
  });

  describe('getEmployeeById', () => {
    it('should fetch an employee by ID', async () => {
      req.params.id = '1';
      const employee = [{ id: 1, name: 'John Doe' }];
      (db.select as jest.Mock).mockResolvedValue(employee);

      await employeeController.getEmployeeById(req, res);

      expect(db.select).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(employee[0]);
    });

    it('should return 404 if employee ID does not exist', async () => {
      req.params.id = '1';
      (db.select as jest.Mock).mockResolvedValue([]);

      await employeeController.getEmployeeById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Employee not found' });
    });
  });
});