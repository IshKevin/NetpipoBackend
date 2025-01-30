// src/routes/employee.routes.ts
import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();
const employeeController = new EmployeeController();

// Public route
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);

// Protected routes
router.post('/', authenticateToken, employeeController.createEmployee);
router.put('/:id', authenticateToken, employeeController.updateEmployee);
router.delete('/:id', authenticateToken, employeeController.deleteEmployee);

export default router;