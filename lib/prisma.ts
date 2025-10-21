import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of PrismaClient in development (hot-reloading)
// See: https://www.prisma.io/docs/guides/performance-and-optimization/connection-management
declare global {
	// eslint-disable-next-line no-var
	var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;