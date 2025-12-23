import { Router } from 'express';
import * as applicationsController from '../controllers/applications.controller';
import { authenticate, requireRole } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Applicant routes
router.post('/', requireRole('applicant', 'hr', 'admin'), applicationsController.createApplication);
router.get('/', applicationsController.getApplications);
router.get('/:id', applicationsController.getApplicationById);

// HR routes
router.put('/:id/status', requireRole('hr', 'admin'), applicationsController.updateApplicationStatus);
router.post('/:id/notes', requireRole('hr', 'admin'), applicationsController.addApplicationNotes);

export default router;

