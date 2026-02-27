'use server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
	try {
		const { userId } = await auth();

		if (!userId) throw new Error('Unauthorized');

		if (isLiked) {
			await prisma.like.delete({
				where: {
					sourceUserId_targetUserId: {
						sourceUserId: userId,
						targetUserId,
					},
				},
			});
		} else {
			await prisma.like.create({
				data: {
					sourceUserId: userId,
					targetUserId,
				},
			});
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function fetchCurrentUserLikeIds() {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error('Unauthorized');

		const likeIds = await prisma.like.findMany({
			where: {
				sourceUserId: userId,
			},
			select: {
				targetUserId: true,
			},
		});

		return likeIds.map((like) => like.targetUserId);
	} catch (error) {
		console.log(error);
		throw error;
	}
}
