import Joi from "@hapi/joi";

export const authModel = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(2).required(),
});
