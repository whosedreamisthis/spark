import { PrismaClient } from '../lib/generated/prisma/client';
import { membersData } from './membersData';
import { hash } from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

const sql = neon(process.env.DATABASE_URL!);
const adapter = new PrismaNeon(sql as any, { schema: 'spark' });

// 2. Pass the adapter to the constructor
const prisma = new PrismaClient({ adapter });

async function seedMembers() {
	console.log('🌱 Starting seeding...');

	const passwordHash = await hash('password', 10);

	// Use Promise.all to ensure we wait for all operations to complete
	const results = await Promise.all(
		membersData.map(async (member) => {
			try {
				return await prisma.sparkUser.upsert({
					where: { email: member.email },
					update: {}, // Don't change existing users
					create: {
						email: member.email,
						emailVerified: new Date(),
						name: member.name,
						passwordHash: passwordHash,
						image: member.image,
						clerkId: `seed_clerk_${Math.random()
							.toString(36)
							.substring(7)}`,
						member: {
							create: {
								dateOfBirth: new Date(member.dateOfBirth),
								gender: member.gender,
								name: member.name,
								created: new Date(member.created),
								updated: new Date(member.lastActive),
								description: member.description,
								city: member.city,
								country: member.country,
								image: member.image,
								photos: {
									create: {
										url: member.image,
									},
								},
							},
						},
					},
				});
			} catch (error) {
				console.error(`❌ Error seeding user ${member.email}:`, error);
				return null;
			}
		}),
	);

	console.log(`✅ Seeded ${results.filter(Boolean).length} users.`);
}

async function main() {
	await seedMembers();
}

main()
	.catch((e) => {
		console.error('💥 Fatal seeding error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
