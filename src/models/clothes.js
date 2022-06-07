'use strict';

const Clothes = (sequelize, DataTypes) =>
    sequelize.define("Clothes", { // create a table
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })

module.exports = Clothes;