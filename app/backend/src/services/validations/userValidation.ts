import * as Joi from 'joi';
import ILogin from '../../Interfaces/ILogin';

const loginSchema = Joi.object({
  email: Joi.string().email().allow(''),
  password: Joi.string().allow(''),
});

const validateLoginFields = (body: ILogin) => {
  const { error } = loginSchema.validate(body);
  if (error) {
    return { message: 'All fields must be filled' };
  }
};

export default validateLoginFields;
