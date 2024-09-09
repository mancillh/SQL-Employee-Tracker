const express = require('express');

//uses require() function built into NODE to include Inquirer (for prompting user for information)
const inquirer = require("inquirer");

// Import and require Pool (node-postgres)
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    //PostgreSQL username
    user: 'postgres',
    //PostgreSQL password
    password: '1234',
    host: 'localhost',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
)

pool.connect();

//an array of questions to ask the user via Inquirer
const chooseAction = () => {
  return inquirer.prompt([
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'action',
    choices: [
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'View All Roles',
      'Add Role',
      'View All Departments',
      'Add Department',
      'Quit'],
  },
  ]).then ((answers) => {
    switch(answers.action){
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add Employee':
        createEmployee();
        break;
      case 'Update Employee Role':
        updateEmployee();
        break;    
      case 'View All Roles':
        viewRoles();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'View All Departments':
        viewDepartments();
        break;
      case 'Add Department':
        createDepartment();
        break;
      case 'Quit':
        quit();
        break;
    }}).catch((error) => {
      console.error('Error during prompt:', error)
    });
  };

 chooseAction();

//  // View all employees
// function viewEmployees() {
//   const sql = 
//    `SELECT * FROM employee`; 
//       pool.query(sql, (err, { rows }) => {
//         if (err) {
//             console.log(err)
//         }
//         else {
//             console.table(rows)
//             chooseAction()
//         }
//     })
// }

// // Add employee
// function createEmployee() {
//     inquirer.prompt([
//     {
//       type: "input",
//       message: "What is the employee's first name?",
//       name: "firstName",
//     },
//     {
//       type: "input",
//       message: "What is the employee's last name?",
//       name: "lastName",
//     },
//     {
//       type: "list",
//       message: "What is the employee's role?",
//       name: "employeeRole",
//       choices: ['Sales Lead','Salesperson','Lead Engineer','Software Engineer','Account Manager','Accountant','Legal Team Lead', 'Lawyer', 'Customer Service'],
//     },
//     {
//       type: "list",
//       message: "Who is the employee's manager?",
//       name: "employeeManager",
//       choices: ['None','Elmer Fudd','Bugs Bunny','Daffy Duck','Wile E. Coyote','Tweety Bird'],
//     }
//   ])
// app.post('/api/new-employee', ({ body }, res) => {
//   const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
//     VALUES ($1)`;
//   const params = [body.first_name, body.last_name];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });
// }

// // Delete an employee
// app.delete('/api/employees/:id', (req, res) => {
//   const sql = `DELETE FROM employees WHERE id = $1`;
//   const params = [req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Employee not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.rowCount,
//         id: req.params.id
//       });
//     }
//   });
// });

// //Update Employee Role
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = $1 WHERE id = $2`;
//   const params = [req.body.review, req.params.id];

//   pool.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.rowCount) {
//       res.json({
//         message: 'Review not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.rowCount
//       });
//     }
//   });
// });

// // View Roles
// function viewRoles() {
//   app.get('/api/movies', (req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;
  
//     pool.query(sql, (err, { rows }) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

//   // Add Role
// function addRole(){
//   inquirer.prompt([
//     {
//       type: "input",
//       message: "What is the name of the role?",
//       name: "role"
//     },
//     {
//       type: "input",
//       message: "What is the salary of the role?",
//       name: "salary"
//     }    
//   ]).then (function(answers) {
//     console.log(answers);
//   })
// }


// // View Departments
// function viewDepartments() {
//   app.get('/api/movies', (req, res) => {
//     const sql = `SELECT id, movie_name AS title FROM movies`;
  
//     pool.query(sql, (err, { rows }) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//         return;
//       }
//       res.json({
//         message: 'success',
//         data: rows
//       });
//     });
//   });

const viewDepartments = async () => {
  try {
    const query = 'SELECT *  FROM department';
    const res = await pool.query(query);
    console.table(res.rows);
    chooseAction();
  } catch (err) {
    console.error('Error Viewing Departments', err);
  }
};

//   //Add Department
// function addDepartment(){
//   inquirer.prompt([
//     {
//       type: "input",
//       message: "What is the name of the department?",
//       name: "department"
//     }
//   ]).then (function(answers) {
//     console.log(answers);
//   })
// }

// // Quit

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
