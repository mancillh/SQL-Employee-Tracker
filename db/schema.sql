DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department INT NOT NULL,
    FOREIGN KEY (department)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    FOREIGN KEY (id)
    REFERENCES employee(manager_id)
    ON DELETE SET NULL
);
