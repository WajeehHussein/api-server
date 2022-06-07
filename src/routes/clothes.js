'use strict';
const express = require('express');


const { Clothes } = require("../models/index.js");


const clothesRouter = express.Router();
clothesRouter.get('/', home)
clothesRouter.post("/clothes", addClothes)
clothesRouter.get("/clothes", getClothes)
clothesRouter.get('/clothes/:id', getOne)
clothesRouter.put('/clothes/:id', updateClothes)
clothesRouter.delete('/clothes/:id', deleteClothes)




async function home(req, res) {
    res.send('hello')
}

async function addClothes(req, res) {
    let newClothes = req.body;
    let clothes = await Clothes.create(newClothes)
    res.status(201).json(clothes)
}
async function getClothes(req, res) {
    const clothesResult = await Clothes.read();
    res.status(200).json(clothesResult);
}

async function getOne(req, res) {
    let clothesId = parseInt(req.params.id);
    let clothes = await Clothes.read(clothesId);
    res.status(200).json(clothes)
}


async function updateClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let updatedClothes = req.body;
    let clothes = await Clothes.read(clothesId);
    if (clothes) {
        let updated = await clothes.update(updatedClothes);
        res.status(201).json(updated);
    } else {
        res.status(404);
    }
}


async function deleteClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let clothes = await Clothes.delete(clothesId);
    res.status(204).json(clothes)
}

module.exports = clothesRouter;
