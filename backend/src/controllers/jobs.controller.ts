import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import * as jobsService from '../services/jobs.service';
import { AuthRequest } from '../middleware/auth.middleware';

const createJobSchema = z.object({
  title: z.string().min(1),
  department: z.string().min(1),
  location: z.string().min(1),
  jobType: z.enum(['full_time', 'part_time', 'contract', 'internship']),
  description: z.string().min(1),
  requirements: z.string().min(1),
  salaryRangeMin: z.number().optional(),
  salaryRangeMax: z.number().optional(),
  expiresAt: z.string().datetime().optional().transform((str) => str ? new Date(str) : undefined),
});

export const createJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const validatedData = createJobSchema.parse(req.body);
    const job = await jobsService.createJob(validatedData, req.userId);
    res.status(201).json(job);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = {
      status: req.query.status as string | undefined,
      department: req.query.department as string | undefined,
      location: req.query.location as string | undefined,
      jobType: req.query.jobType as string | undefined,
      search: req.query.search as string | undefined,
      page: req.query.page ? parseInt(req.query.page as string) : 1,
      limit: req.query.limit ? parseInt(req.query.limit as string) : 20,
    };
    const result = await jobsService.getJobs(filters);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const job = await jobsService.getJobById(req.params.id);
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const updateData = req.body;
    const job = await jobsService.updateJob(req.params.id, updateData, req.userId);
    res.json(job);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const result = await jobsService.deleteJob(req.params.id, req.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

