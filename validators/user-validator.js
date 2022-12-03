
const Joi = require('joi');

const create = Joi.object({
    username:Joi.string().min(4).max(20).required(),
    password:Joi.string().min(5).max(100).required()
});

const checkParams = Joi.object({
    id:Joi.number().required().greater(0).positive()
});

const userSchema = {
    create,
    checkParams
}

module.exports = userSchema;