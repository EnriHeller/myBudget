const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Users = sequelize.define("users",{
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin:{
        field: "isAdmin",
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }},{
        tableName:"users",
        underscored: true,
    }
)

module.exports = Users;