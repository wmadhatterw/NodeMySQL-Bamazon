# NodeMySQL-Bamazon

This project is a CLI using mySQL and Inquirer from the Terminal. Below a demonstration movie is attached.  To clone this repo and use the CLI on your machine follow these instructions.


### Install/Use instructions
```
1. Type following text in Terminal
git clone https://github.com/wmadhatterw/NodeMySQL-Bamazon.git
2. Type following text in Terminal
npm install
3. create mySQL database with the SQL file provided
4. Type following in Terminal
node bamazon.js
```


or view movie in Movie Folder

[link to Movie!](/movie/Bamazon.mov?raw=true "Movie")

This project is a CLI demonstrating how to interact with a mySQL database using Inquirer from command line. This is displaying screens of the app in action and the source code, not intended to actually be run from what is provided here. 


### Prerequisites

The following NPM packages are dependencies:

```
inquirer
mysql

```

Also required for this app is a connection to mySQL database with tables for: 
```
products

```

Here is the SQL file:

```
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

```
