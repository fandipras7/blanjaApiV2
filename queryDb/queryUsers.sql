CREATE TABLE users(
    id VARCHAR(64) NOT NULL,
    name VARCHAR(32),
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    role_id VARCHAR(32),
    status VARCHAR(32),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    PRIMARY KEY(id)
);

ALTER TABLE users ADD COLUMN status VARCHAR(32);
ALTER TABLE users ADD COLUMN phone_number VARCHAR(32);
ALTER TABLE users ADD COLUMN store_name VARCHAR(32);