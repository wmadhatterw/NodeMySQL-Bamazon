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
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {

	connection.query("SELECT * FROM bamazon.Products", function(err, results) {
    if (err) throw err;
//     // once you have the items, prompt the user for which they'd like to bid on
console.log(results)
    inquirer
      .prompt([
		{

          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];

            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].productName);
            }
            return choiceArray;
          },
          message: "What is the ID number of the Product you would like to buy?"
		},
        {
          name: "amount",
          type: "input",
          message: "How many units would you like to buy?"
        }
      ])
	    .then(function(answer) {
	    	var item = answer.choice;
	    	var quantitySold = parseInt(answer.amount);
			var stockQuantity = results[0].stockQuantity;
			var itemNo = results[0].ID;
			var salePrice = results[0].price * answer.amount;
	    	var query = "SELECT * FROM Products WHERE ?";
	    	connection.query(query, {productName:item}, function(err, data){

	    		if(err) throw err;
	    		
				if (data.length===0){
				console.log("ERROR: Invalid Item.");
				start();
				} else if(stockQuantity > quantitySold){
					stockQuantity = stockQuantity - quantitySold;

					var updateQueryStr = 'UPDATE Products SET stockQuantity = ' + stockQuantity + ' WHERE ID = ' + itemNo;
					connection.query(updateQueryStr,  function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + salePrice);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();
					})
					// console.log(data)
					// console.log(answer)
					// console.log(stockQuantity)

				} else{
					console.log("Insufficient Quantity");
					start();
				}
	    	});
	    });
	})
}

  











