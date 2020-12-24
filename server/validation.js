const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        token:Joi.string().required()
    });
    return schema.validate(data);
}

const expenseValidation = (data) => {
    const schema = Joi.object({
        category: Joi.string().required(),
        type: Joi.string().required(),
        amount: Joi.number().min(0).required(),
    });
    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.expenseValidation = expenseValidation;