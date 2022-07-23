CREATE TABLE seller(
    id VARCHAR(64) NOT NULL,
    name VARCHAR(32),
    email VARCHAR(64) NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    password VARCHAR(64) NOT NULL,
    store_name VARCHAR (32),
    roleId VARCHAR (32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);