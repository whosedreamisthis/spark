'use server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { use } from 'react';

export async function toggleLikeMember(targetUserId: string, isLiked: boolean) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return {
				status: 'unauthorized',
				message: 'You must be logged in to like members.',
			};
		}

		if (isLiked) {
			await prisma.like.deleteMany({
				where: { sourceUserId: userId, targetUserId },
			});
		} else {
			await prisma.like.upsert({
				where: {
					sourceUserId_targetUserId: {
						sourceUserId: userId,
						targetUserId,
					},
				},
				update: {}, // Do nothing if it already exists
				create: { sourceUserId: userId, targetUserId },
			});
		}
		return {
			status: 'success',
			message: 'Toggle Like Succeeded',
		};
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function fetchCurrentUserLikeIds() {
	try {
		const { userId } = await auth();
		if (!userId) return []; //throw new Error('Unauthorized');

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

export async function fetchLikedMembers(type = 'source') {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error('Unauthorized');

		switch (type) {
			case 'source':
				return await fetchSourceLikes(userId);
			case 'target':
				return await fetchTargetLikes(userId);
			case 'mutual':
				return await fetchMutualLikes(userId);

			default:
				return [];
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
}

async function fetchSourceLikes(userId: string) {
	const sourceList = await prisma.like.findMany({
		where: {
			sourceUserId: userId,
		},
		select: {
			tagetMember: true,
		},
	});
	return sourceList.map((x) => x.tagetMember);
}

async function fetchTargetLikes(userId: string) {
	const targetList = await prisma.like.findMany({
		where: {
			targetUserId: userId,
		},
		select: {
			sourceMember: true,
		},
	});
	return targetList.map((x) => x.sourceMember);
}

async function fetchMutualLikes(userId: string) {
	const likedUsers = await prisma.like.findMany({
		where: { sourceUserId: userId },
		select: { targetUserId: true },
	});
	const likedIds = likedUsers.map((x) => x.targetUserId);

	const mutualList = await prisma.like.findMany({
		where: {
			AND: [{ targetUserId: userId }, { sourceUserId: { in: likedIds } }],
		},
		select: { sourceMember: true },
	});
	return mutualList.map((x) => x.sourceMember);
}
