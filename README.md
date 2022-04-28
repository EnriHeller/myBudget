# My Budget

It's a managing tool for a personal budget. With this app, you can save, create and edit your money movements (incomes and outflows). Too, you will see the total balance of all registered operations. 

---
## Requirements
---

To use this app, you should set the database and start frontend and backend servers. You should have the next softwares:

* Node JS
* Git Bash
* Xampp
* MySQL Workbench (versión 8.0.26)

---
## Installation
---

To set database connection, First you must inicialize MySQL module on XAMPP, then open **MySQL Workbench** and set a new connection with the next params:

```
Connection Name: XAMPP MYSQL
Connextion Method: Standard (TCP/IP)
Hostname: 127.0.0.1
Port: 3306
Username: root 
```

Then confirm, press **OK** and get into connection.
After that, open *scriptSql.sql* file saved on *back* folder and execute their sentences. It will be created *my-budget* schema (If do you want to see it, it's necessary refresh the schema list).

Later, To run the local server, open *back* folder in Git Bash terminal and execute `npm install` for install the proyect dependencies. Next, you must run `npm run dev`.

If the steps were executed successfully, you should see the following message in the console:

```
Server initialized on port 3001 
Executing (default): SELECT 1+1 AS result
Database connection successful
```

Finally, in another terminal, you must open *front* folder and execute `npm start`. After that, it will open a window with the app in the default browser.
