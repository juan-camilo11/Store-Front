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
  });
};

//this function displays all items that have a stock quantity of less than 5
const displayLowInventory = () => {
  let queryString =
    "SELECT * FROM products WHERE stock_quantity <= 5 ORDER BY stock_quantity";
  connection.query(queryString, (err, resp) => {
    if (err) throw err;
    resp.map(x => {
      console.log("Displaying low-stock inventory");
      console.log(
        `Item ID: ${x.item_id} | Item: ${x.product_item} | Department: ${
          x.department_name
        } | Price: ${x.price} | Quantity In-stock: ${x.stock_quantity}`
      );
    });
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
      runDaTing();
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
      runDaTing();
    }
  );
};

const addNewItem = (argThing, argQuantity, argDep, argPrice) => {
    let queryString = 'INSERT INTO products (product_item, department_name, price, stock_quantity) VALUES (?,?,?,?)';
    connection.query(queryString,[argThing, argDep, argPrice, argQuantity], (err, resp) =>{
        if(err) throw err;
        console.log(`The database was successfully updated`);

    });

}



