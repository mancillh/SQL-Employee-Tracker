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

// Helps create Inquirer choice list, lists all departments from department table
const listDepartments = async () => {
  try {
  return pool.query(`SELECT * FROM department;`)
  .then(( {rows} ) => 
    rows.map(department => ({
      name: `${department.name}`,
      value: department.id
    })))
  } catch (err) {
    console.error('Error gathering departments', err);
  }
      return []
};

// Helps create Inquirer choice list, lists all roles from role table
const listRoles = async () => {
  try {
    return pool.query(`SELECT role.id, role.title FROM role;`)
   .then(( {rows} ) =>

    rows.map(role => ({
      name: `${role.title}`,
      value: role.id
    }), department => ({
      name: `${department.name}`,
      value: department.id
    })
  ))
  }  catch (err) {
    console.error('Error gathering roles', err);
  }
      return []
};;

// Helps create Inquirer choice list, lists all employees from employee table
const listEmployees = async () => {
  try {
    return pool.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee;`)
   .then(( {rows} ) =>

    rows.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    })))
  }  catch (err) {
    console.error('Error gathering employees', err);
  }
      return []
};

// Helps create Inquirer choice list, lists all managers from employee table
const listManagers = async () => {
  try {
    return pool.query(`SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE manager_id IS NULL;`)
   .then(( {rows} ) =>

    rows.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    })))
  }  catch (err) {
    console.error('Error gathering managers', err);
  }
      return []
};

//an array of questions to ask the user via Inquirer
const chooseAction = async () => {
  await inquirer.prompt([
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
  ]).then (async (answers) => {
    switch(answers.action){
      case 'View All Employees':
        await viewEmployees();
        break;
      case 'Add Employee':
        await createEmployee();
        break;
      case 'Update Employee Role':
        await updateEmployee();
        break;    
      case 'View All Roles':
        await viewRoles();
        break;
      case 'Add Role':
        await addRole();
        break;
      case 'View All Departments':
        await viewDepartments();
        break;
      case 'Add Department':
        await createDepartment();
        break;
      case 'Quit':
        await quit();
        break;
    }}).catch((error) => {
      console.error('Error during prompt:', error)
    });
  };

 chooseAction();

// View all employees
const viewEmployees = async () => {
  try {
    const sql = `SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS job_title, department.name AS department, role.salary, CONCAT(manager.first_name,' ',manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id`;
    const res = await pool.query(sql);
    console.table(res.rows);
    chooseAction();
  } catch (err) {
    console.error('Error Viewing All Employees', err);
  }
};

// Create employee
const createEmployee = async () => {
    await inquirer.prompt([
    {
      type: "input",
      message: "What is the employee's first name?",
      name: "firstName",
    },
    {
      type: "input",
      message: "What is the employee's last name?",
      name: "lastName",
    },
    {
      type: "list",
      message: "What is the employee's role?",
      name: "employeeRole",
      choices: await listRoles(),
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "employeeManager",
      choices: await listManagers(),
    }
  ]).then(async (answers) => {
    const res = await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *', [answers.firstName, answers.lastName, answers.employeeRole, answers.employeeManager]);
    return res.rows[0];
  })
  chooseAction();
};

//Update Employee Role
const updateEmployee = async () => {
  await inquirer.prompt([
  {
    type: "list",
    message: "Which employee would you like to update?",
    name: "employeeName",
    choices: await listEmployees(),
  },
  {
    type: "list",
    message: "What is the employee's new role?",
    name: "employeeRole",
    choices: await listRoles(),
  },
]).then(async (answers) => {
  const res = await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.employeeRole, answers.employeeName]);
  return res.rows[0];
})
chooseAction();
};

// View Roles
const viewRoles = async () => {
  try {
    const sql = 'SELECT title AS job_title, role.id AS role_id, salary, department.name AS department FROM role JOIN department ON role.department_id = department.id ';
    const res = await pool.query(sql);
    console.table(res.rows);
    chooseAction();
  } catch (err) {
    console.error('Error Viewing Roles', err);
  }
};

// Create Role
const addRole = async () => {
  await inquirer.prompt([
    {
      type: "list",
      message: "Which Department?",
      name: "department",
      choices: await listDepartments(),
    },
    {
      type: "input",
      message: "What is the name of the role?",
      name: "role"
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "salary"
    }    
  ]).then(async(answers) => {
    const res = await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *', [answers.role, answers.salary, answers.department]);
    return res.rows[0];
  })
  chooseAction();
};

const viewDepartments = async () => {
  try {
    const sql = 'SELECT id, name AS department_name FROM department';
    const res = await pool.query(sql);
    console.table(res.rows);
    chooseAction();
  } catch (err) {
    console.error('Error Viewing Departments', err);
  }
};

  //Add Department
const createDepartment = async () => {
  await inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department"
    }
  ]).then(async(answers) => {
    const res = await pool.query('INSERT INTO department (name) VALUES ($1) RETURNING *', [answers.department]);
    return res.rows[0];
  })
  chooseAction();
};

// Quit
const quit = async () => {
  await process.exit();
};