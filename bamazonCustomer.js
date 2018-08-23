const sqlObj = require("./sqlObj.js");
const mysql = require("mysql");
const inq = require("inquirer");

const connection = mysql.createConnection(sqlObj);

const displayWares = () => {
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
        if (parseInt(x.stock_quantity) >= parseInt(argQuantity)) {
          console.log("transation can be achieved");
          completeTransaction(argId, argQuantity, x.stock_quantity);
        } else {
          console.log("This transaction cannot be completed due insufficient quantities");
          runDaTing();
        }
      }
    });
    if (!flag) {
      console.log("the ID you chose is invalid");
      runDaTing();
    }
  });
};

const completeTransaction = (argId, argQuantity, ogQuantity) => {
//   console.log("we made it into complete transaction");
  let newQuantity = parseInt(ogQuantity) - parseInt(argQuantity);
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
      console.log('Your transaction was successful!' );
      runDaTing();
    }
  );
};

//main function
const runDaTing = () => {
  let exitFlag = 0;
  inq
    .prompt([
      {
        name: "choice",
        type: "list",
        message: "Please select what you would like to do> \n",
        choices: ["Browse wares.", "Exit"]
      }
    ])
    .then(ans => {
      if (ans.choice === "Exit") {
          connection.end();
      } else {
        displayWares();
        inq
          .prompt([
            {
              name: "itemID",
              type: "input",
              message:
                "Please enter the ID of the product you would like to buy > \n"
            },
            {
              name: "quantity",
              type: "input",
              message: "Please enter the quantity you want to buy >"
            }
          ])
          .then(ans => {
            if (!parseInt(ans.itemID)) {
              console.log("the input you entered is not valid");
              runDaTing();
            } else if (!parseInt(ans.quantity)) {
              console.log("the input you entered is not valid");
              runDaTing();
            } else {
              checkStock(ans.itemID, ans.quantity);
              
            }
          });
      }
    });
};

runDaTing();
