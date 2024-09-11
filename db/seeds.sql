INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'), 
       ('Legal'),
       ('Sales'),
       ('Service');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead',100000,4),
       ('Lead Engineer',150000,1),
       ('Salesperson',60000,4),
       ('Software Engineer',110000,1),
       ('Account Manager',90000,2),
       ('Accountant',70000,2),
       ('Legal Team Lead',100000,3),
       ('Lawyer',95000,3),
       ('Customer Service',50000,5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Hannah', 'Mancill', 4, 2), 
       ('Stephen', 'Mancill', 2, NULL),
       ('Elmer', 'Fudd', 3, 4),
       ('Bugs', 'Bunny', 5, NULL),
       ('Daffy', 'Duck', 7, NULL),
       ('Wile E.', 'Coyote', 8, 5),
       ('Tweety', 'Bird', 9, 4);

