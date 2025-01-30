// src/controllers/employee.controller.ts
import { Request, Response } from 'express';
import { db } from '../config/database';
import { employees, Employee, NewEmployee } from '../schema/employee.schema';
import { eq } from 'drizzle-orm';
import { AuthRequest } from '../middleware/auth.middleware';

export class EmployeeController {
  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, position, salary }: NewEmployee = req.body;
      
      const newEmployee = await db.insert(employees)
        .values({ name, email, position, salary })
        .returning();
      
      res.status(201).json(newEmployee[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error creating employee', error });
    }
  }

  async getAllEmployees(req: Request, res: Response): Promise<void> {
    try {
      const allEmployees = await db.select().from(employees);
      res.json(allEmployees);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employees', error });
    }
  }

  async getEmployeeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const employee = await db.select()
        .from(employees)
        .where(eq(employees.id, parseInt(id)))
        .limit(1);

      if (!employee.length) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }

      res.json(employee[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching employee', error });
    }
  }

  async updateEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: Partial<NewEmployee> = req.body;

      const updatedEmployee = await db.update(employees)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(employees.id, parseInt(id)))
        .returning();

      if (!updatedEmployee.length) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }

      res.json(updatedEmployee[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error updating employee', error });
    }
  }

  async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deletedEmployee = await db.delete(employees)
        .where(eq(employees.id, parseInt(id)))
        .returning();

      if (!deletedEmployee.length) {
        res.status(404).json({ message: 'Employee not found' });
        return;
      }

      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting employee', error });
    }
  }
}