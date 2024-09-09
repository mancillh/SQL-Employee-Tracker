-- SELECT department.id AS department, role.department_id
-- FROM role
-- LEFT JOIN department
-- ON role.department_id = department.id;

-- SELECT role.id AS role, employee.role_id
-- FROM employee
-- LEFT JOIN role
-- ON employee.role_id = role.id;

-- SELECT employee.id AS employee, employee.manager_id
-- FROM employee
-- LEFT JOIN role
-- ON employee.manager_id = employee.id;

SELECT * FROM department;