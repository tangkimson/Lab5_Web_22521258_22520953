const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const ExternalUser = sequelize.define(
    'ExternalUser',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        externalId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING
        },
        website: {
            type: DataTypes.STRING
        }
    },
    {
        tableName: 'ExternalUsers',
        timestamps: false
    }
);

module.exports = ExternalUser;
