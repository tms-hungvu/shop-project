import Joi from "joi"
import { password_regex } from "@/util/pattern";
import { email_regex } from "@/util/pattern";
import { messageValidate } from "@/util/messageValidate"
export const schemaLogin = Joi.object({
    email : Joi.string()
    .pattern(new RegExp(email_regex))
    .required()
    .messages({
        'string.empty': messageValidate['email.required'],
        'string.pattern.base': messageValidate['email.regex'],
        'any.required': messageValidate['email.required']
    }),
    password : Joi.string()
    .pattern(new RegExp(password_regex))
    .required()
    .messages({
        'any.required': messageValidate['password.required'],
        'string.empty': messageValidate['password.required'],
        'string.pattern.base': messageValidate['password.regex']
    })
})