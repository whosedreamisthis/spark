'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import Pusher from 'pusher';

const pusherServer = new Pusher({
	appId: process.env.PUSHER_APP_ID!,
	key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
	secret: process.env.PUSHER_SECRET!,
	cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
	useTLS: true,
});

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

		const sender = await prisma.member.findUnique({
			where: { clerkId: userId },
		});

		const channelName = [message.senderId, message.recipientId]
			.sort()
			.join('-');

		await pusherServer.trigger(channelName, 'message:new', message);

		await pusherServer.trigger(`user-${recipientId}`, 'message:new', {
			senderId: userId,
			senderName: sender?.name,
			text: message.text,
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
