import { auth, currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function syncUser() {
	const { userId } = await auth(); // This is much faster
	if (!userId) return null;

	const user = await currentUser();
	if (!user) return null;

	// Check if they exist
	const dbUser = await prisma.sparkUser.findUnique({
		where: { clerkId: user.id },
	});

	if (!dbUser) {
		return await prisma.sparkUser.upsert({
			where: { email: user.emailAddresses[0].emailAddress },
			update: { clerkId: user.id },
			create: {
				clerkId: user.id,
				email: user.emailAddresses[0].emailAddress,
				name: `${user.firstName} ${user.lastName}`,
				image: user.imageUrl,
				member: {
					create: {
						name: user.firstName || 'User',
						gender: 'other',
						city: 'Unknown',
						country: 'Unknown',
						image: user.imageUrl,
						dateOfBirth: new Date('1900-01-01'),
						description: '',
						interests: '',
					},
				},
			},
		});
	}

	return dbUser;
}
