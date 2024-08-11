//uses require() function built into NODE to include Inquirer (for prompting user for information)
const inquirer = require("inquirer");

//an array of questions to ask the user via Inquirer
const questions = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "action",
    choices: ['View All Employees','Add Employee','Update Employee Role','View All Roles','Add Role','View All Departments','Add Department','Quit'],
  },
  {
    type: "input",
    message: "What is the name of the department?",
    name: "department",
  },
  {
    type: "input",
    message: "What is the name of the employee?",
    name: "name",
  },
  {
    type: "input",
    message: "What is the name of the role?",
    name: "role",
  }]

  // the init() function first prompts the user for how they want their icon to look. Based on what the user 
  // selects 
function init() {
  inquirer.prompt(questions)
    .then((answers) => {

    })
}

// the init() function is called when the developer first types "node server" into the terminal.
init()