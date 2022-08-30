import { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import adminRoutes from './admin';

const router = Router();

router.use('/auth', authRoutes);
router.use(userRoutes);
router.use(adminRoutes);

export default router;
