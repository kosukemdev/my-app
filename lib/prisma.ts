import { PrismaClient } from "@prisma/client";

// In serverless / hot-reloading environments creating multiple instances of
// PrismaClient can lead to exhaustion of database connections or errors.
// Use a global variable to reuse the client during development.
declare global {
	// allow connecting to globalThis in Node.js for a cached PrismaClient
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	// eslint-disable-next-line no-var
	var __prisma: PrismaClient | undefined;
}

const prisma: PrismaClient = (globalThis as any).__prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") (globalThis as any).__prisma = prisma;

export default prisma;
