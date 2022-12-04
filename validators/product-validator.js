const Joi = require('joi');


const create = Joi.object({
    name:Joi.string().min(4).max(20).required(),
    price:Joi.number().greater(0).required(),
    quantity:Joi.number().greater(0).required()
});

const productId = Joi.object({
    id:Joi.number().greater(0).required(),
});

const update = Joi.object({
    name:Joi.string().min(4).max(20).optional(),
    price:Joi.number().greater(0).optional(),
    quantity:Joi.number().greater(0).optional()
});

const productSchema = {
    create,
    productId,
    update
}

module.exports = productSchema;