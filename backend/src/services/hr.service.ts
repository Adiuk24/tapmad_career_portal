import prisma from '../config/database';

export const getDashboardStats = async () => {
  const [totalJobs, totalApplications, pendingApplications, totalCandidates] = await Promise.all([
    prisma.job.count({
      where: { status: { in: ['published', 'draft'] } },
    }),
    prisma.application.count(),
    prisma.application.count({
      where: { status: 'pending' },
    }),
    prisma.user.count({
      where: { role: 'applicant' },
    }),
  ]);

  return {
    totalJobs,
    totalApplications,
    pendingApplications,
    totalCandidates,
  };
};

export const getAnalytics = async (filters?: { startDate?: Date; endDate?: Date }) => {
  const where: any = {};
  if (filters?.startDate || filters?.endDate) {
    where.createdAt = {};
    if (filters.startDate) where.createdAt.gte = filters.startDate;
    if (filters.endDate) where.createdAt.lte = filters.endDate;
  }

  const [
    applicationsByStatus,
    applicationsByJob,
    applicationsByDepartment,
    timeToHire,
  ] = await Promise.all([
    prisma.application.groupBy({
      by: ['status'],
      _count: true,
      where,
    }),
    prisma.application.groupBy({
      by: ['jobId'],
      _count: true,
      where,
      orderBy: { _count: { jobId: 'desc' } },
      take: 10,
    }),
    prisma.$queryRaw`
      SELECT j.department, COUNT(a.id) as count
      FROM applications a
      JOIN jobs j ON a."jobId" = j.id
      GROUP BY j.department
      ORDER BY count DESC
    `,
    prisma.application.findMany({
      where: {
        status: 'hired',
        ...where,
      },
      select: {
        appliedAt: true,
        updatedAt: true,
      },
    }),
  ]);

  // Calculate average time to hire
  const avgTimeToHire = timeToHire.length > 0
    ? timeToHire.reduce((acc, app) => {
        const days = Math.floor(
          (new Date(app.updatedAt).getTime() - new Date(app.appliedAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        return acc + days;
      }, 0) / timeToHire.length
    : 0;

  return {
    applicationsByStatus,
    applicationsByJob,
    applicationsByDepartment,
    avgTimeToHire: Math.round(avgTimeToHire),
    totalHired: timeToHire.length,
  };
};

export const getCandidates = async (filters?: {
  search?: string;
  page?: number;
  limit?: number;
}) => {
  const { search, page = 1, limit = 20 } = filters || {};
  const skip = (page - 1) * limit;

  const where: any = {
    role: 'applicant',
  };

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [candidates, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      include: {
        applicantProfile: true,
        applications: {
          select: {
            id: true,
            status: true,
            job: {
              select: {
                title: true,
                department: true,
              },
            },
          },
        },
        _count: {
          select: {
            applications: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    candidates,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

