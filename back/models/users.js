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
    },{
        tableName:"users",
        underscored: true,
    }
)

module.exports = Users;