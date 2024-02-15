import Joi from "joi";

const CareerValidator = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    company: Joi.string().required(),
    salary: Joi.object({
        min: Joi.number().required(),
        max: Joi.number(),
        currency: Joi.string().required(),
    }),
    location: Joi.string().required(),
    status: Joi.string(),
    isHired: Joi.boolean(),
    level: Joi.string(),
    work_location: Joi.string(),
    shortid: Joi.string(),
    date: Joi.date(),
});

export default CareerValidator;