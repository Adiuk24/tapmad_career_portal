import prisma from '../config/database';
import { AppError } from '../middleware/error.middleware';

export interface CreateJobData {
  title: string;
  department: string;
  location: string;
  jobType: 'full_time' | 'part_time' | 'contract' | 'internship';
  description: string;
  requirements: string;
  salaryRangeMin?: number;
  salaryRangeMax?: number;
  expiresAt?: Date;
}

export interface UpdateJobData extends Partial<CreateJobData> {
  status?: 'draft' | 'published' | 'closed' | 'archived';
}

export const createJob = async (data: CreateJobData, postedBy: string) => {
  const job = await prisma.job.create({
    data: {
      ...data,
      postedBy,
    },
    include: {
      poster: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
    },
  });

  return job;
};

export const getJobs = async (filters: {
  status?: string;
  department?: string;
  location?: string;
  jobType?: string;
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const {
    status,
    department,
    location,
    jobType,
    search,
    page = 1,
    limit = 20,
  } = filters;

  const skip = (page - 1) * limit;

  const where: any = {};

  if (status) {
    where.status = status;
  } else {
    // Default: only show published jobs for public
    where.status = 'published';
  }

  if (department) {
    where.department = { contains: department, mode: 'insensitive' };
  }

  if (location) {
    where.location = { contains: location, mode: 'insensitive' };
  }

  if (jobType) {
    where.jobType = jobType;
  }

  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { department: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        poster: {
          select: {
            id: true,
            fullName: true,
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
    }),
    prisma.job.count({ where }),
  ]);

  return {
    jobs,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getJobById = async (id: string) => {
  const job = await prisma.job.findUnique({
    where: { id },
    include: {
      poster: {
        select: {
          id: true,
          fullName: true,
          email: true,
        },
      },
      _count: {
        select: {
          applications: true,
        },
      },
    },
  });

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  return job;
};

export const updateJob = async (id: string, data: UpdateJobData, userId: string) => {
  // Check if job exists and user has permission
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  // Only allow HR/admin or job poster to update
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (job.postedBy !== userId && user?.role !== 'hr' && user?.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  // If status is being changed to published, set postedAt
  if (data.status === 'published' && job.status !== 'published') {
    data.postedAt = new Date();
  }

  const updatedJob = await prisma.job.update({
    where: { id },
    data,
    include: {
      poster: {
        select: {
          id: true,
          fullName: true,
        },
      },
    },
  });

  return updatedJob;
};

export const deleteJob = async (id: string, userId: string) => {
  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    throw new AppError('Job not found', 404);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (job.postedBy !== userId && user?.role !== 'hr' && user?.role !== 'admin') {
    throw new AppError('Unauthorized', 403);
  }

  await prisma.job.delete({
    where: { id },
  });

  return { message: 'Job deleted successfully' };
};

