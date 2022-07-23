CREATE TABLE role(
    id INT NOT NULL PRIMARY KEY,
    name_role VARCHAR(24)
);

INSERT INTO role (id, name_role)VALUES(1, 'Customer');
INSERT INTO role (id, name_role)VALUES(2, 'Seller');