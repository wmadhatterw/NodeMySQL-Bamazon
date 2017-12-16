var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  displayInventory();
});
// displayInventory Function
function displayInventory() {

	queryStr = 'SELECT * FROM Products';

	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');
		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].ID + '| ';
			strOut += 'Product Name: ' + data[i].productName + '| ';
			strOut += 'Department: ' + data[i].departmentName + '| ';
			strOut += 'Price: $' + data[i].price + '| ';
			strOut += 'Stock: ' + data[i].stockQuantity;

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	start();
	})
}


// function which prompts the user for what action they should take
function start() {

	connection.query("SELECT * FROM bamazon.Products", function(err, results) {
    if (err) throw err;

    inquirer
      .prompt([
		{

          name: "choice",
          type: "input",
          message: "What is the ID number of the Product you would like to buy?",
	         validate: function(value) {
	          if (isNaN(value) === false) {
	            return true;
	          }
	          return false;
	        }
		},
        {
          name: "amount",
          type: "input",
          message: "How many units would you like to buy?",
			validate: function(value) {
          	if (isNaN(value) === false) {
            return true;
          	}
          	return false;
        	}
        }
      ])
	    .then(function(answer) {
	    	var item = parseInt(answer.choice);

	    	var itemNo = item - 1;
	    	var quantitySold = parseInt(answer.amount);
			var stockQuantity = results[itemNo].stockQuantity;
			var salePrice = results[itemNo].price * answer.amount;

			// Call data from data base
	    	var query = "SELECT * FROM Products WHERE ?";
	    	connection.query(query, {ID:item}, function(err, data){

	    		if(err) throw err;
	    		
				if (data.length===0){
				console.log("ERROR: Invalid Item.");
				start();
				} else if(stockQuantity >= quantitySold){
					stockQuantity = stockQuantity - quantitySold;
		// Write data to database
					var updateQueryStr = 'UPDATE Products SET stockQuantity = ' + stockQuantity + ' WHERE ID = ' + item;
					connection.query(updateQueryStr,  function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + salePrice);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					})

				} else{
					console.log("Insufficient Quantity Please Select an amount less than " + stockQuantity);
					start();
				}
	    	});
	    });
	})
}

  











