CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_item VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price FLOAT(7,2) NOT NULL,
    stock_quantity INT NOT NULL
);

INSERT INTO products (product_item, department_name, price, stock_quantity)
VALUES ("thing1","dep1",5.00,100), ("thing2","dep2",8.00,200), ("thing3","dep3",10.00,50), ("thing4","dep3",9.00,100), ("thing5","dep4",40.00,150), ("thing6","dep2",100.00,40), ("thing7","dep1",15.50,150), ("thing8","dep4",35.00,10), ("thing9","dep1",19.20,100), ("thing10","dep1",305.00,100);

