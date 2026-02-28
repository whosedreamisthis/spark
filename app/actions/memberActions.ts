'use server';
import { prisma } from '@/lib/prisma';
import { calculateAge, isOnline } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';

export async function getMembers() {
	const { userId } = await auth();

	// if (!userId) return null;

	try {
		const members = prisma.member.findMany({
			where: userId ? { NOT: { clerkId: userId } } : {},
			select: {
				id: true,
				name: true,
				image: true,
				city: true,
				country: true,
				clerkId: true,
				lastActive: true,
				dateOfBirth: true,
				// Only include fields you actually display on the card!
			},
		});
		return (await members).map((member) => ({
			...member,
			age: calculateAge(member.dateOfBirth), // Do it here!
			isOnline: isOnline(member.lastActive),
		}));
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

export async function getMemberPhotosByUserId(userId: string) {
	if (!userId) {
		console.error('getMemberPhotosByUserId was called without a userId');
		return [];
	}
	try {
		const member = await prisma.member.findUnique({
			where: { clerkId: userId },
			include: { photos: true },
		});
		return member?.photos;
	} catch (error) {
		console.error(error);
		return null;
	}
}
