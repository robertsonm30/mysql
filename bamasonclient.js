var mysql = require("mysql");
var inquirer = require("inquirer");
var productList = [];
var productQTYs = [];

console.log("The app")

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "put password here",
	database: "bamazon"
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	connection.query("SELECT * FROM products", function(err, result, fields) {
		if (err) throw err;
		for (var i = 0; i < result.length; i++) {
			console.log("\n" + result[i].item_id + "\n" + result[i].product_name + "\n" + result[i].department_name + "\n" + result[i].price + "\n" + result[i].stock_quantity);
			productList.push(result[i].product_name);
			productQTYs.push(result[i].stock_quantity);
		}
		inquirer.prompt([
			{
				name: "buy",
				type: "list",
				message: "What do you want to buy?",
				choices: productList
			},
			{
				name: "qty",
				type: "input",
				message: "How Many?"
			}
		])
		.then(function(resp) {
			console.log("You want " + resp.qty + " of " + resp.buy + ".");
			var indexer = resp.buy;
			var itemIndex = productList.indexOf(indexer);
			var itemCost = result[itemIndex].price;
			var storeQTYIndex = result[itemIndex].stock_quantity;
			var multiplier = parseInt(resp.qty);
			var itemTotal = itemCost * multiplier;
			var bringTableDown = storeQTYIndex - multiplier;
			console.log("They are $" + itemCost + " per/.");
			console.log("This will cost $" + itemTotal + ".");
			console.log("");
			console.log("Now checking to see if the store has enough...");
			if (storeQTYIndex < multiplier) {
				console.log("");
				console.log("Too bad. They don't have enough.");
				connection.destroy();
			}
			else {
				var calzone = "UPDATE `bamazon`.`products` SET `stock_quantity`='" + bringTableDown + "' WHERE `product_name`='" + indexer + "'";
				connection.query(calzone, function(err, result, fields) {
					if (err) throw err;
					console.log("Your order is complete.");
					connection.destroy();
				});
			}
		});
	});
});