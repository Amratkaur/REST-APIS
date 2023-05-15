const Joi = require("joi");
const registerValidation = async (req, res, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(10).max(100),
    password: Joi.string().min(3).max(20).required().label("password"),
    email: Joi.string().min(3).max(100),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.json({ message: error.message, isSucess: false });
  } else {
    next();
  }
};

const otherPeople = async (req, res, next) => {
  const schema1 = Joi.object().keys({
    place: Joi.string().min(3).max(100).required(),
  });
  const { error } = schema1.validate(req.body);
  if (error) {
    res.json({ message: error.message, isSucess: false });
  } else {
    next();
  }
};

module.exports = { registerValidation, otherPeople };
