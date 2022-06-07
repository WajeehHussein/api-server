'use strict';
// orgonize my code


// require database url
require('dotenv').config();
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

// require Sequelize
const { Sequelize, DataTypes } = require('sequelize');


// require other models
const food = require('./food');
const clothes = require('./clothes')
const collection = require('./collection-calss')

let sequelizeOptions =
    process.env.NODE_ENV === "production"
        ? {
            dialect: 'postgres',
            protocol: 'postgres',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                },
                native: true
            }
        } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const foodCollection = new collection(food(sequelize, DataTypes));
const clothesCollection = new collection(clothes(sequelize, DataTypes));

module.exports = {
    db: sequelize,
    Food: foodCollection,
    Clothes: clothesCollection,
};