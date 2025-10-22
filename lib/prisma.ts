import { PrismaClient } from '@prisma/client';

// Use a global variable to preserve the PrismaClient instance across module reloads
// in development to avoid exhausting database connections.
declare global {
  // eslint-disable-next-line no-var
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var __prisma: PrismaClient | undefined;
}

const _global = global as unknown as { __prisma?: PrismaClient };
const prisma = _global.__prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') _global.__prisma = prisma;

export default prisma;
