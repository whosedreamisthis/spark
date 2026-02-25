// prisma.config.ts
import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Manually load the .env file
dotenv.config({ path: '.env.local' });

export default defineConfig({
	datasource: {
		url: process.env.DATABASE_URL,
	},
	migrations: {
		// This is the new home for your seed command in Prisma 7
		seed: 'npx tsx prisma/seed.ts',
	},
});
