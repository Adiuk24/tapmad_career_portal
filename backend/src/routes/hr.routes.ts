import { Router } from 'express';
import * as hrController from '../controllers/hr.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);
router.use(requireRole('hr', 'admin'));

router.get('/stats', hrController.getDashboardStats);
router.get('/analytics', hrController.getAnalytics);
router.get('/candidates', hrController.getCandidates);

export default router;

