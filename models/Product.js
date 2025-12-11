const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Product = sequelize.define(
    'Product',
    {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        manufacturingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    },
    {
        tableName: 'Products',
        timestamps: false
    }
);

module.exports = Product;
