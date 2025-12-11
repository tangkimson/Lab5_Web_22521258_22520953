const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const User = sequelize.define(
    'User',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        registrationDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        tableName: 'Users',
        timestamps: false
    }
);

module.exports = User;
