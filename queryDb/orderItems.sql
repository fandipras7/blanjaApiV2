CREATE TABLE order_item(
    id varchar(122) NOT NULL,
    order_id varchar(122) NOT NULL,
    product_id varchar(122) NOT NULL,
    quantity INT NOT NULL,
    creted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modifed_at TIMESTAMP
);

INSERT INTO order_items (order_id, product_id, quantity)VALUES(1, 2, 2);

SELECT * FROM order_details.id, user.name FROM order_details INNER JOIN user on order_details.user_id = user.id;