CREATE TABLE users (
    id VARCHAR PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
 );
CREATE TABLE products (
    id VARCHAR PRIMARY KEY NOT NULL,
    user_id VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    DESCRIPTION TEXT NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE carts (
    id VARCHAR PRIMARY KEY NOT NULL,
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE cart_items (
    cart_id VARCHAR NOT NULL,
    product_id VARCHAR NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE orders (
    id VARCHAR PRIMARY KEY NOT NULL,
    user_id VARCHAR NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    order_id VARCHAR NOT NULL,
    product_id VARCHAR NOT NULL,
    quantity INT NOT NULL,
    title VARCHAR NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);