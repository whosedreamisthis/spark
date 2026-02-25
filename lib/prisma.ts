import { neon } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/lib/generated/prisma/client';

// 1. Connection string (ensure it includes ?schema=spark if you use standard CLI)
const connectionString = String(process.env.DATABASE_URL || '');
const sql = neon(connectionString);

// 2. IMPORTANT: Pass the schema name 'spark' as the second argument
const adapter = new PrismaNeon(sql, { schema: 'spark' });

const globalForPrisma = (global as unknown) as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
		log: ['query', 'error', 'warn'],
	});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
