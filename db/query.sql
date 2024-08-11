SELECT department.id AS department, role.department
FROM role
LEFT JOIN department
ON role.department = department.id;