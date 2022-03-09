const Users = require("./users");
const Budget = require("./budget");

Users.hasMany(Budget, {
    foreignKey: "users_id",
});

module.exports = {
    Users,
    Budget
};