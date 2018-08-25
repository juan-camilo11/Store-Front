const sqlObj = require("./sqlObj.js");
const mysql = require("mysql");
const inq = require("inquirer");

const connection = mysql.createConnection(sqlObj);

//this function displays all products avaliable within the database including all details associated with each
const displayProducts = () => {
  let queryString = `SELECT * FROM products`;
  connection.query(queryString, (err, resp) => {
    if (err) throw err;
    resp.map(x => {
      console.log(
        `Item ID: ${x.item_id} | Item: ${x.product_item} | Department: ${
          x.department_name
        } | Price: ${x.price} | Quantity In-stock: ${x.stock_quantity}`
      );
    });

    runIt();
  });
};

//"SELECT * FROM products WHERE stock_quantity <= 5 ORDER BY stock_quantity"
//this function displays all items that have a stock quantity of less than 5
const displayLowInventory = () => {
  let queryString =
    "SELECT * FROM products WHERE stock_quantity <= 5 AND stock_quantity > 0 ORDER BY stock_quantity";
  connection.query(queryString, (err, resp) => {
    if (err) throw err;
    // console.log(resp);
    if (resp != []) {
      // console.log("We in this B");
      resp.map(x => {
        console.log("Displaying low-stock inventory");
        console.log(
          `Item ID: ${x.item_id} | Item: ${x.product_item} | Department: ${
            x.department_name
          } | Price: ${x.price} | Quantity In-stock: ${x.stock_quantity}`
        );
      });
    } else {
      console.log("There is no low stock inventory!");
    }
    runIt();
  });
};

//this function checks to make sure the ID of the item we are trying to update exists and
//gets the current stock_quantity within the databse at the time we are wanting to update
const checkStock = (argId, argQuantity) => {
  let queryString = `SELECT * FROM products`;
  let flag = false;
  connection.query(queryString, (err, resp) => {
    if (err) throw err;
    resp.map(x => {
      if (parseInt(x.item_id) === parseInt(argId)) {
        flag = true;
        // console.log("in first if statement");
        // console.log(x.item_id);
        // console.log(x.stock_quantity);
        // console.log(typeof x.stock_quantity);

        reStock(argId, argQuantity, x.stock_quantity);
      }
    });
    if (!flag) {
      console.log("the ID you chose is invalid");
      runIt();
    }
  });
};

//this function lets a manager add stock to any product in the store
const reStock = (argId, argQuantity, ogQuantity) => {
  //   console.log("we made it into complete transaction");
  let newQuantity = parseInt(ogQuantity) + parseInt(argQuantity);
  //   console.log(newQuantity);
  //   console.log(typeof newQuantity);
  connection.query(
    `UPDATE products SET ? WHERE ?`,
    [
      {
        stock_quantity: newQuantity
      },
      {
        item_id: argId
      }
    ],
    (err, resp) => {
      if (err) throw err;
      //   console.log(`${resp.affectedRows} bids were updated \n`);
      console.log("Your stock update was successful!");
      runIt();
    }
  );
};

const addNewItem = (argThing, argQuantity, argDep, argPrice) => {
  let queryString =
    "INSERT INTO products (product_item, department_name, price, stock_quantity) VALUES (?,?,?,?)";
  connection.query(
    queryString,
    [argThing, argDep, argPrice, argQuantity],
    (err, resp) => {
      if (err) throw err;
      console.log(`The database was successfully updated`);
      runIt();
    }
  );
};

const runIt = () => {
  let exitFlag = 0;
  inq
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "Please select what you would like to do> \n",
        choices: [
          "Display current stock",
          "Display low inventory stock",
          "Add new product",
          "Re-stock",
          "Exit"
        ]
      }
    ])
    .then(ans => {
      if (ans.choice === "Exit") {
        connection.end();
      } else {
        switch (ans.choice) {
          case "Display current stock":
            displayProducts();
            break;
          case "Display low inventory stock":
            displayLowInventory();
            break;
          case "Add new product":
            inq
              .prompt([
                {
                  name: "product",
                  type: "input",
                  message:
                    "Please input the product you would like to add to the inventory"
                },
                {
                  name: "department",
                  type: "input",
                  message: "Please input the department for the new product"
                },
                {
                  name: "price",
                  type: "input",
                  message: "Please set the price for the new product"
                },
                {
                  name: "stock",
                  type: "input",
                  message: "Please set the stock value for the new product"
                }
              ])
              .then(ans => {
                if (!parseFloat(ans.price)) {
                  console.log("The price value you entered is invalid");
                  runIt();
                } else if (!parseInt(ans.stock)) {
                  console.log("The stock value you entered is invalid");
                  runIt();
                } else {
                  addNewItem(
                    ans.product,
                    parseInt(ans.stock),
                    ans.department,
                    parseFloat(ans.price)
                  );
                }
              });
            break;
          case "Re-stock":
            inq
              .prompt([
                {
                  name: "itemID",
                  type: "input",
                  message:
                    "Please enter the ID of the product you would like to re-stock > \n"
                },
                {
                  name: "quantity",
                  type: "input",
                  message:
                    "Please enter the quantity you want to add to the exisiting amount >"
                }
              ])
              .then(ans => {
                if (!parseInt(ans.itemID)) {
                  console.log("the input you entered is not valid");
                  runIt();
                } else if (!parseInt(ans.quantity)) {
                  console.log("the input you entered is not valid");
                  runIt();
                } else {
                  checkStock(ans.itemID, ans.quantity);
                }
              });
        }
      }
    });
};

runIt();
