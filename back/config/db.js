const Sequelize = require("sequelize");

const {DB_USER, DB_HOST, DB_NAME,DB_PORT, DB_PASS} = process.env;

const conString = `mysql://${DB_USER}${
    DB_PASS? `:${DB_PASS}` : ""
}@${DB_HOST}:${DB_PORT}/${DB_NAME}`; 

const sequelizeObject = new Sequelize(conString);

sequelizeObject
.authenticate()
.then(() => {
    console.log("Database connection successful");
})
.catch((e) => {
    console.error(e.message);
});

module.exports = sequelizeObject;
