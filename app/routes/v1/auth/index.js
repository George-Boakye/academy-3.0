import { Router } from 'express';
import userHandler from '../../../controllers/user';
import adminHandler from '../../../controllers/admin';
import { AuthMiddleware, RoleMiddleware, ValidationMiddleware } from '../../../middlewares';
import validationSchema from '../../../middlewares/validation/validationSchema';

const router = Router();
const { loginEmailValidator, comparePassword, authenticate, adminLoginEmailValidator } =
  AuthMiddleware;
const { roleValueValidator, adminAccessValidator } = RoleMiddleware;
const { validate } = ValidationMiddleware;
const { signInUser, createApplication, getUser, getQuestions, updateUser } = userHandler;
const {
  createAssessment,
  getApplicants,
  createBatchApplication,
  getBatchApplications,
  updateAdmin,
  signInAdmin,
  getAdmin,
  updateApplicants,
  updateTimer
} = adminHandler;

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
  validate(validationSchema.adminSignInSchema),
  adminLoginEmailValidator,
  comparePassword,
  roleValueValidator,
  adminAccessValidator,
  signInAdmin
);

router.post(
  '/batch-application',
  authenticate,
  validate(validationSchema.batchSchema),
  createBatchApplication
);

router.post(
  '/create-assessment',
  authenticate,
  validate(validationSchema.assessmentSchema),
  createAssessment
);

router.get('/questions', authenticate, getQuestions);
router.get('/applicants', authenticate, getApplicants);
router.get('/all/batches', authenticate, getBatchApplications);
router.get('/user/:userId', getUser);
router.get('/admin/:adminId', getAdmin);

router.put('/applicants', authenticate, updateApplicants);
router.put('/user/:userId', authenticate, updateUser);
router.put('/admin/:id', authenticate, updateAdmin);
router.put('/admin/timer/:id', authenticate, updateTimer);
export default router;
