import Joi from 'joi';
import { ValidationHelper } from '../../utils/helpers';

const userSignUpSchema = Joi.object({
  firstName: ValidationHelper.stringCheck('First Name'),
  lastName: ValidationHelper.stringCheck('Last Name'),
  emailAddress: ValidationHelper.emailCheck(),
  phoneNumber: ValidationHelper.phoneNumberCheck(),
  password: ValidationHelper.passwordCheck(),
  confirmPassword: Joi.ref('password')
});

const userSignInSchema = Joi.object({
  emailAddress: ValidationHelper.emailCheck(),
  password: ValidationHelper.passwordCheck()
});

export default { userSignUpSchema, userSignInSchema };
