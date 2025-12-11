const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ShoppingCart = sequelize.define(
    'ShoppingCart',
    {
        cartId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'ShoppingCarts',
        timestamps: false
    }
);

module.exports = ShoppingCart;
