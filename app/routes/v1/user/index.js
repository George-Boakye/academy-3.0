import { Router } from 'express';
import userValidations from '../../../middlewares/user/userValidations';
import userHandler from '../../../controllers/user';
import validationSchema from '../../../middlewares/validation/validationSchema';
import { ValidationMiddleware } from '../../../middlewares';

const { addUser } = userHandler;
const { validateUserSignUp } = userValidations;
const { validate } = ValidationMiddleware;

const router = Router();

router.post(
  '/user/signup',
  validate(validationSchema.userSignUpSchema),
  validateUserSignUp,
  addUser
);

export default router;
