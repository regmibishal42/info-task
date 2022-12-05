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
const buy = Joi.object({
    id:Joi.number().greater(0).positive().required(),
    quantity:Joi.number().greater(0).positive().required()
});
const productSchema = {
    create,
    productId,
    update,
    buy
}

module.exports = productSchema;