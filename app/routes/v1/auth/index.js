import { Router } from 'express';
import userHandler from '../../../controllers/user';
import { AuthMiddleware, ValidationMiddleware } from '../../../middlewares';
import validationSchema from '../../../middlewares/validation/validationSchema';

const router = Router();
const { loginEmailValidator, comparePassword, authenticate } = AuthMiddleware;
const { validate } = ValidationMiddleware;
const { signInUser, createApplication } = userHandler;

router.post(
  '/user/login',
  validate(validationSchema.userSignInSchema),
  loginEmailValidator,
  comparePassword,
  signInUser
);

router.post(
  '/admin/login',
  validate(validationSchema.userSignInSchema),
  loginEmailValidator,
  comparePassword,
  signInUser
);

router.post(
  '/application',
  authenticate,
  validate(validationSchema.applicationSchema),
  createApplication
);

export default router;
