INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead',100000,2),
       ('Chief Engineer',150000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Hannah', 'Mancill', 1, 1), 
       ('Stephen', 'Mancill', 1, 1);

