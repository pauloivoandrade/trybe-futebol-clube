import * as Joi from 'joi';
import ILogin from '../../Interfaces/ILogin';

const invalidMail = 'Invalid email or password';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
}).messages(
  {
    'string.email': invalidMail,
    'string.min': invalidMail,
    'string.empty': 'All fields must be filled',
  },
);

const validateLoginFields = (body: ILogin) => {
  const { error } = loginSchema.validate(body);
  if (error && error.details[0].type === 'string.empty') {
    return { status: 400, message: error.details[0].message };
  }
  if (error) {
    return { status: 401, message: error.details[0].message };
  }
};

export default validateLoginFields;
