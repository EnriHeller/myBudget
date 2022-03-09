const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const types = ["ENTRY", "EGRESS"]

const Budget = sequelize.define("budget",{
    type:{
        type: DataTypes.ENUM(...types),
        allowNull: false,
    },
    value:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    concept:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    },
    {
        tableName:"budget",
        underscored: true,
    }
)

module.exports = Budget;