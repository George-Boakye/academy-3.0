import User from '../models/user';
import { constants, helpers } from '../utils';
import ValidationMiddleware from './validation';
import validationSchema from './validation/validationSchema';

const { ErrorFactory } = helpers;
const { RESOURCE_ALREADY_EXIST } = constants;
const { userSignUpSchema, userSignInSchema } = validationSchema;
const { validate } = ValidationMiddleware;

const validateSignUpSchema = validate(userSignUpSchema);

const validateUserSignUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ emailAddress: req.body.emailAddress });
    if (user) {
      return res.status(400).send({
        message: RESOURCE_ALREADY_EXIST('Email'),
        data: []
      });
    }
    next();
  } catch (error) {
    return ErrorFactory.resolveError(error);
  }
};

const validateSignInSchema = validate(userSignInSchema);

export default {
  validateSignUpSchema,
  validateSignInSchema,
  validateUserSignUp
};
