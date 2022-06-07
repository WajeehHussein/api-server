'use strict';


const Food = (sequelize, DataTypes) =>
    sequelize.define("food", { // create a table
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })

module.exports = Food;

/*
    in each model I create table use seuelize
*/