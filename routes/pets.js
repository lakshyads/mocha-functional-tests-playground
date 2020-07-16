const express = require('express');
const router = express.Router();

const Pet = require('../models/pets');
const { route } = require('./users');

const Joi = require('@hapi/joi');
const { validateBody } = require('../middlewares/route')


router.route('/')
    .get(async (req, res, next) => {
        try {
            const pets = await Pet.find();
            res.status(200).send(pets);
        } catch (e) {
            next(e);
        }
    })
    .post(validateBody(Joi.object().keys({
        name: Joi.string().required().description('Pet name'),
        age: Joi.number().integer().required().description('Pet age'),
        colour: Joi.string().required().description('Pet colour')
    }), { stripUnknown: true }), async (req, res, next) => {
        try {
            const pet = await new Pet(req.body).save();
            res.status(201).send(pet);
        } catch (e) {
            next(e);
        }
    });

router.delete('/:id', async (req, res, next) => {
    try {
        const result = await Pet.deleteMany({ _id: req.params.id });
        res.status(200).send(pets);
    } catch (e) {
        next(e);
    };
})

module.exports = router;
