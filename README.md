# Store-Front

What is it:

Store-front is a CLI node based application that allows customers to browse and purchase items, and gives store managers the ability to manage their inventory. 


Why did I make this:

This project was created in an effort to further develop my programming knowledge in the node framework as well as learn how to query and use a mySQL database.


How does it work:

When executing the bamazonCustomer script, the user is prompted to "browse wares" or "exit". The user can navigate the option using the up and down arrow keys, and hit enter to make their selection. If "browse wares" is selected, a list populates in CLI displaying all items avaliable for purchase. The user is then prompted to input the ID of the item they wish to purchase and the quantity of the item they wish to purchase. The user is then notified if their transaction was successful or not based on their inputs. After the transaction is completed, the user is taken back to the "main menu" where they can select from "browse wares" or "exit". If the user choses to exit the application is closed. See GIF below!

![Alt Text](.\bamazonCustomerGIF.gif)

When executing the bamazonManager script, the user is prompted to either "display stock", "display low inventory stock", "add a new product", "re-stock", or "exit". As in the bamazon customer script, the user can use the upa dn down arrow keys to navigate through the options that are presented. See below for a description for each:

display stock: displays all items avaliable in the store along with corresponding details

display low stock: displays all items in the store that have a stock value less than 5. If there are no items that meet this criteria, the user is notified that no items are low in stock

add a new product: This allows the user to add a new item to the store. The user is prompted for the following details regarding the new product: product name, department, price, and stock. If valid values are provided for each, the new product is stored in our database and the product list is updated. If the user inputs invalid values they are notified.

re-stock: this allows the user to update the stock quantity of existing items by adding stock to the existing stock value. The user is prompted to select the ID of the item they wish to update and are then prompted to choose the amount they wish to add to the stock. If invalid values are passed, the user is notified and the re-stock will not be successful.

exit: closes the application.

See GIF below:

![Alt Text](.\bamazonManagerGIF.gif)