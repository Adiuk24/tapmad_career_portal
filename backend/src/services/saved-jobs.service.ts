import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export const saveJob = async (userId: string, jobId: string) => {
  // Check if job exists
  const job = await prisma.job.findUnique({
    where: { id: jobId },
  });

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  // Check if already saved
  const existing = await prisma.savedJob.findUnique({
    where: {
      userId_jobId: {
        userId,
        jobId,
      },
    },
  });

  if (existing) {
    throw new AppError('Job already saved', 400);
  }

  const savedJob = await prisma.savedJob.create({
    data: {
      userId,
      jobId,
    },
    include: {
      job: {
        select: {
          id: true,
          title: true,
          department: true,
          location: true,
          jobType: true,
        },
      },
    },
  });

  return savedJob;
};

export const unsaveJob = async (userId: string, jobId: string) => {
  const savedJob = await prisma.savedJob.findUnique({
    where: {
      userId_jobId: {
        userId,
        jobId,
      },
    },
  });

  if (!savedJob) {
    throw new AppError('Saved job not found', 404);
  }

  await prisma.savedJob.delete({
    where: {
      userId_jobId: {
        userId,
        jobId,
      },
    },
  });

  return { message: 'Job unsaved successfully' };
};

export const getSavedJobs = async (userId: string, page: number = 1, limit: number = 20) => {
  const skip = (page - 1) * limit;

  const [savedJobs, total] = await Promise.all([
    prisma.savedJob.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { savedAt: 'desc' },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            department: true,
            location: true,
            jobType: true,
            salaryRangeMin: true,
            salaryRangeMax: true,
            status: true,
          },
        },
      },
    }),
    prisma.savedJob.count({ where: { userId } }),
  ]);

  return {
    savedJobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

