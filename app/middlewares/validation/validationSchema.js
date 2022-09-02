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

const adminSignUpSchema = Joi.object({
  fullName: ValidationHelper.stringCheck('Full Name'),
  email: ValidationHelper.emailCheck(),
  phoneNumber: ValidationHelper.phoneNumberCheck(),
  country: ValidationHelper.stringCheck(),
  address: ValidationHelper.stringCheck('Address'),
  password: ValidationHelper.passwordCheck(),
  confirmPassword: Joi.ref('password'),
  img: Joi.any()
});

const userSignInSchema = Joi.object({
  emailAddress: ValidationHelper.emailCheck(),
  password: ValidationHelper.passwordCheck()
});
const adminSignInSchema = Joi.object({
  email: ValidationHelper.emailCheck(),
  password: ValidationHelper.passwordCheck()
});

const applicationSchema = Joi.object({
  firstName: ValidationHelper.stringCheck('First Name'),
  lastName: ValidationHelper.stringCheck('Last Name'),
  emailAddress: ValidationHelper.emailCheck(),
  dateOfBirth: ValidationHelper.dateCheck('Date of Birth'),
  address: ValidationHelper.stringCheck('Address'),
  university: ValidationHelper.stringCheck('University'),
  course: ValidationHelper.stringCheck('Course of Study'),
  cgpa: ValidationHelper.numberCheck('cgpa'),
  cv: Joi.any(),
  img: Joi.any()
});

const assessmentSchema = Joi.array().items(
  Joi.object({
    file: Joi.any(),
    question: ValidationHelper.stringCheck(),
    options: {
      a: ValidationHelper.stringCheck(),
      b: ValidationHelper.stringCheck(),
      c: ValidationHelper.stringCheck(),
      d: ValidationHelper.stringCheck()
    },
    correctAnswer: Joi.string().max(1),
    selectedAnswer: null
  })
);

const batchSchema = Joi.object({
  file: Joi.any(),
  link: Joi.string(),
  closureDate: Joi.date(),
  batchId: Joi.number().required(),
  instructions: Joi.string()
});

export default {
  userSignUpSchema,
  userSignInSchema,
  applicationSchema,
  assessmentSchema,
  batchSchema,
  adminSignUpSchema,
  adminSignInSchema
};
