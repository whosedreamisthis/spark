'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function getProfile() {
	const { userId } = await auth();

	if (!userId) return null;

	try {
		return await prisma.member.findUnique({
			where: { clerkId: userId },
			include: { photos: true },
		});
	} catch (error) {
		console.log(error);
	}
}
