CREATE TABLE payment(
    id varchar(122),
    order_id varchar(122),
    amount INT NOT NULL,
    provider VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL,
    creted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modifed_at TIMESTAMP
);

INSERT INTO payment (id, order_id, amount, provider, status)VALUES(1, 001, 120000, 'GOPAY', 'paid off');