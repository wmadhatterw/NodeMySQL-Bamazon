Drop DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE Products (
    ID int NOT NULL AUTO_INCREMENT,
    productName varchar(255) NOT NULL,
    departmentName varchar(255),
    price int,
    stockQuantity int,
    PRIMARY KEY (ID)
);