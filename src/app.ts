import express from 'express';
import employeeRoutes from './routes/employee.routes';
import authRoutes from './routes/auth.routes';
import { setupSwagger } from './swagger';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/employees', employeeRoutes);

setupSwagger(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;