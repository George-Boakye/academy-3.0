import { Router } from 'express';
import userHandler from '../../../controllers/user';
import adminHandler from '../../../controllers/admin';
import { AuthMiddleware, RoleMiddleware, ValidationMiddleware } from '../../../middlewares';
import validationSchema from '../../../middlewares/validation/validationSchema';

const router = Router();
const { loginEmailValidator, comparePassword, authenticate } = AuthMiddleware;
const { roleValueValidator, adminAccessValidator } = RoleMiddleware;
const { validate } = ValidationMiddleware;
const { signInUser, createApplication, getUser, getQuestions } = userHandler;
const { createAssessment, getApplicants } = adminHandler;

router.post(
  '/user/login',
  validate(validationSchema.userSignInSchema),
  loginEmailValidator,
  comparePassword,
  roleValueValidator,
  signInUser
);

router.post(
  '/application',
  authenticate,
  validate(validationSchema.applicationSchema),
  createApplication
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
  '/create-assessment',
  authenticate,
  validate(validationSchema.assessmentSchema),
  createAssessment
);
router.get('/questions', authenticate, getQuestions);
router.get('/applicants', authenticate, getApplicants);
router.get('/user/:userId', getUser);
export default router;
