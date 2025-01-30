import { eq } from 'drizzle-orm';
// filepath: /c:/Users/user/Documents/Challeng/Netp/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { db } from '../config/database';
import { users, NewUser } from '../schema/employee.schema';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/constants';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: NewUser = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.insert(users)
        .values({ email, password: hashedPassword })
        .returning();

      res.status(201).json(newUser[0]);
    } catch (error) {
      res.status(500).json({ message: 'Error creating account', error });
      console.error(error);
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await db.select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user.length) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const validPassword = await bcrypt.compare(password, user[0].password);
      if (!validPassword) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }

      const token = jwt.sign({ id: user[0].id, email: user[0].email }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
}