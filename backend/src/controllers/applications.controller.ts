import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as applicationsService from '../services/applications.service';
import { AuthRequest } from '../middleware/auth.middleware';

const createApplicationSchema = z.object({
  jobId: z.string().uuid(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().url().optional(),
});

export const createApplication = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const validatedData = createApplicationSchema.parse(req.body);
    const application = await applicationsService.createApplication(
      validatedData,
      req.userId
    );
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

export const getApplications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const filters = {
      userId: req.userId,
      jobId: req.query.jobId as string | undefined,
      status: req.query.status as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
      userRole: req.userRole,
    };
    const result = await applicationsService.getApplications(filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId || !req.userRole) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const application = await applicationsService.getApplicationById(
      req.params.id,
      req.userId,
      req.userRole
    );
    res.json(application);
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { status, notes } = req.body;
    const application = await applicationsService.updateApplicationStatus(
      req.params.id,
      status,
      req.userId,
      notes
    );
    res.json(application);
  } catch (error) {
    next(error);
  }
};

export const addApplicationNotes = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { notes } = req.body;
    const application = await applicationsService.addApplicationNotes(
      req.params.id,
      notes,
      req.userId
    );
    res.json(application);
  } catch (error) {
    next(error);
  }
};

