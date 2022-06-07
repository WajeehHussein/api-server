'use strict';
const express = require('express');


const foodRouter = express.Router();
foodRouter.get('/', home)
foodRouter.post("/food", addFood)
foodRouter.get("/food", getFood)
foodRouter.get('/food/:id', getOne)
foodRouter.put('/food/:id', updateFood)
foodRouter.delete('/food/:id', deleteFood)
const { Food } = require('../models/index')
console.log('**********************************', Food)


async function home(req, res) {
    res.send('hello')
}
async function addFood(req, res) {
    let newFood = req.body;
    let food = await Food.create(newFood)
    res.status(201).json(food)
}
async function getFood(req, res) {
    const foodResult = await Food.findAll();
    res.status(200).json(foodResult);
}
async function getOne(req, res) {
    let foodId = parseInt(req.params.id);
    let food = await Food.findOne({ where: { id: foodId } });
    res.status(200).json(food)
}


async function updateFood(req, res) {
    let foodId = parseInt(req.params.id);
    let updatedFood = req.body;
    let food = await Food.findOne({ where: { id: foodId } });
    if (food) {
        let updated = await food.update(updatedFood);
        res.status(201).json(updated);
    } else {
        res.status(404);
    }
}


async function deleteFood(req, res) {
    let foodId = parseInt(req.params.id);
    let food = await Food.destroy({ where: { id: foodId } });
    res.status(204).json(food)
}

module.exports = foodRouter;
