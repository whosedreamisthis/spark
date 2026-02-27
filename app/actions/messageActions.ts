'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function createMessage(recipientId: string, text: string) {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error('Unauthorized');

		const message = await prisma.message.create({
			data: {
				text,
				senderId: userId,
				recipientId,
			},
		});

		return message;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export async function getMessageThread(recipientId: string) {
	try {
		const { userId } = await auth();
		if (!userId) throw new Error('Unauthorized');

		return await prisma.message.findMany({
			where: {
				OR: [
					{ senderId: userId, recipientId: recipientId },
					{ senderId: recipientId, recipientId: userId },
				],
			},
			orderBy: {
				created: 'asc',
			},
		});
	} catch (error) {
		console.error(error);
		return [];
	}
}
