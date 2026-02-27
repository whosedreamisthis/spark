'use client';

import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher'; // Initialize pusher-js here
import { Message } from '@prisma/client';

export default function LiveChatMessages({
	initialMessages,
	currentUserId,
	recipientId,
}: {
	initialMessages: Message[];
	currentUserId: string;
	recipientId: string;
}) {
	const [messages, setMessages] = useState(initialMessages);

	useEffect(() => {
		const channelName = [currentUserId, recipientId].sort().join('-');
		const channel = pusherClient.subscribe(channelName);

		channel.bind('message:new', (newMessage: Message) => {
			setMessages((prev) => [...prev, newMessage]);
		});

		return () => {
			pusherClient.unsubscribe(channelName);
			channel.unbind_all();
		};
	}, [currentUserId, recipientId]);

	return (
		<div className="flex flex-col gap-3">
			{messages.map((msg) => (
				<div
					key={msg.id}
					className={`flex ${
						msg.senderId === currentUserId
							? 'justify-end'
							: 'justify-start'
					}`}
				>
					{/* Bubble UI Code here */}
				</div>
			))}
		</div>
	);
}
