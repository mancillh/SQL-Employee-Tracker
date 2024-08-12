const server = require("server.js");

//uses require() function built into NODE to include Inquirer (for prompting user for information)
const inquirer = require("inquirer");

//an array of questions to ask the user via Inquirer
function chooseAction(){
  inquirer.prompt([
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Quit'],
  }
  ]).then (function(answers) {
    console.log(answers);
  })
}
 chooseAction()
 
function addEmployee(){
  inquirer.prompt([
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
      choices: ['Sales Lead','Salesperson','Lead Engineer','Software Engineer','Account Manager','Accountant','Legal Team Lead', 'Lawyer', 'Customer Service'],
    },
    {
      type: "list",
      message: "Who is the employee's manager?",
      name: "employeeManager",
      choices: ['None','Elmer Fudd','Bugs Bunny','Daffy Duck','Wile E. Coyote','Tweety Bird'],
    }
  ]).then (function(answers) {
    console.log(answers);
  })
}

function addRole(){
  inquirer.prompt([
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
  ]).then (function(answers) {
    console.log(answers);
  })
}

function addDepartment(){
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department"
    }
  ]).then (function(answers) {
    console.log(answers);
  })
}
