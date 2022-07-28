CREATE TABLE order_details(
    id varchar(122),
    users_id VARCHAR(122),
    total DECIMAL NOT NULL,
    payment_id INT NOT NULL,
    creted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP
);

INSERT INTO order_details (id, users_id, total, payment_id)VALUES(1, '6bfe8945-5513-4f5c-b404-dbbd839717a7', 120000, 1);

SELECT order_details.id, total, provider, users.name FROM order_details 
INNER JOIN users on order_details.users_id = users.id 
INNER JOIN payment on order_details.payment_id = payment.id;

SELECT order_details.id, total, provider, users.name, order_items.product_id, products.name FROM order_details 
INNER JOIN users on order_details.users_id = users.id 
INNER JOIN payment on order_details.payment_id = payment.id
INNER JOIN order_items on order_details.id = order_items.order_id
INNER JOIN products on order_items.product_id = products.id;
