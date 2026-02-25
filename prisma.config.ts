// prisma.config.ts
import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';

// Manually load the .env file
dotenv.config({ path: '.env.local' });

export default defineConfig({
	datasource: {
		url: process.env.DATABASE_URL,
	},
});
