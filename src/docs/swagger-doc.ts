/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The user ID
 *         email:
 *           type: string
 *           description: User's email address
 *         password:
 *           type: string
 *           description: User's password (hashed)
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - position
 *         - salary
 *       properties:
 *         id:
 *           type: integer
 *           description: The employee ID
 *         name:
 *           type: string
 *           description: Employee's full name
 *         email:
 *           type: string
 *           description: Employee's email address
 *         position:
 *           type: string
 *           description: Employee's job position
 *         salary:
 *           type: number
 *           description: Employee's salary
 */

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: API endpoints related to user authentication
 *   - name: Employees
 *     description: API endpoints related to employee management
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User successfully registered
 *       500:
 *         description: Error creating account
 */
 
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       401:
 *         description: Invalid email or password
 *       500:
 *         description: Error logging in
 */

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Get all employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of employees
 *       500:
 *         description: Error fetching employees
 *   post:
 *     summary: Create a new employee
 *     security:
 *       - BearerAuth: []
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       500:
 *         description: Error creating employee
 */

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Error fetching employee
 *   put:
 *     summary: Update an employee
 *     security:
 *       - BearerAuth: []
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Error updating employee
 *   delete:
 *     summary: Delete an employee
 *     security:
 *       - BearerAuth: []
 *     tags: [Employees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Error deleting employee
 */
