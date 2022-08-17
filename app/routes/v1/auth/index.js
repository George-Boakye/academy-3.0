import { Router } from 'express';
import userHandler from '../../../controllers/user';
import { AuthMiddleware, RoleMiddleware, ValidationMiddleware } from '../../../middlewares';
import validationSchema from '../../../middlewares/validation/validationSchema';

const router = Router();
const { loginEmailValidator, comparePassword, authenticate } = AuthMiddleware;
const { roleValueValidator, adminAccessValidator } = RoleMiddleware;
const { validate } = ValidationMiddleware;
const { signInUser, createApplication } = userHandler;

router.post(
  '/user/login',
  validate(validationSchema.userSignInSchema),
  loginEmailValidator,
  comparePassword,
  roleValueValidator,
  signInUser
);

router.post(
  '/admin/login',
  validate(validationSchema.userSignInSchema),
  loginEmailValidator,
  comparePassword,
  roleValueValidator,
  adminAccessValidator,
  signInUser
);

router.post(
  '/application',
  authenticate,
  validate(validationSchema.applicationSchema),
  createApplication
);

export default router;
