'use server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function getMembers() {
	const { userId } = await auth();

	if (!userId) return null;

	try {
		return prisma.member.findMany({
			where: {
				NOT: {
					clerkId: userId,
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
}

export async function getMemberByUserId(userId: string) {
	try {
		return prisma.member.findUnique({
			where: {
				clerkId: userId,
			},
		});
	} catch (error) {
		console.log(error);
	}
}
