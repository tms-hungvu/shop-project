import Joi from "joi"

import { messageValidate } from "@/util/messageValidate";
import { price_usa_regex } from "@/util/pattern";
export const schemaProduct = Joi.object({
    id : Joi.allow(),
    key : Joi.allow(),
    title : Joi.string()
    .max(40)
    .min(5)
    .required()
    .messages({
        'string.empty': messageValidate['product.title.empty'],
        'string.min': messageValidate['product.tittle.min'],
        'string.max': messageValidate['product.tittle.max']
    }),
    price : Joi.string()
    .pattern(price_usa_regex, { name: 'currency' })
    .required()
    .messages({
        'string.pattern.name': messageValidate['product.price.pattern'],
        'string.empty': messageValidate['product.price.empty'],
    }),
    content : Joi.string()
    .min(5)
    .required()
    .messages({
        'string.empty': messageValidate['product.content.empty'],
        'string.min': messageValidate['product.content.min'],
    }),
    image : Joi.string()
    .uri()
    .required()
    .messages({
        'string.uri': messageValidate['product.image.url'],
        'string.empty': messageValidate['product.image.empty'],
    })
})