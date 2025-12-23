// Lazy Prisma client initialization
// Only imports and creates client when DATABASE_URL is available
// This prevents connection errors on module load

declare global {
  var prisma: any;
}

let prismaInstance: any = null;

function getPrismaClient() {
  // Return existing instance if available
  if (prismaInstance) {
    return prismaInstance;
  }

  // Only initialize if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    return null;
  }

  try {
    // Dynamic import to prevent connection on module load
    const { PrismaClient } = require('@prisma/client');
    
    prismaInstance = globalThis.prisma ?? new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
    
    if (process.env.NODE_ENV !== 'production') {
      globalThis.prisma = prismaInstance;
    }
    
    return prismaInstance;
  } catch (error) {
    console.warn("Failed to initialize Prisma client:", error);
    return null;
  }
}

// Export a proxy that lazily initializes Prisma
export default new Proxy({} as any, {
  get(target, prop) {
    const prisma = getPrismaClient();
    if (!prisma) {
      // Return a no-op function for methods
      if (typeof prop === 'string') {
        return () => {
          throw new Error(`Prisma client not available. DATABASE_URL is not configured.`);
        };
      }
      return undefined;
    }
    return (prisma as any)[prop];
  },
});

