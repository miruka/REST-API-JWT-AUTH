const Joi = require("@hapi/joi");

exports.registrationValidation = (data) => {
  //Vallidation
  const schema = {
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};

exports.loginValidation = (data) => {
  //Vallidation
  const schema = {
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
  };
  return Joi.validate(data, schema);
};
