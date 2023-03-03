DROP TABLE order_items;
DROP TABLE orders;

CREATE TABLE orders (
    id VARCHAR PRIMARY KEY NOT NULL,
    user_id VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    total_price REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    order_id VARCHAR NOT NULL,
    product_id VARCHAR NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);