'use client';

import { useEffect, useState, useRef } from 'react';
import { pusherClient } from '@/lib/pusher';
import { format } from 'date-fns';

export default function MessageList({
	initialMessages,
	currentUserId,
	recipientId,
}: {
	initialMessages: any[];
	currentUserId: string;
	recipientId: string;
}) {
	const [messages, setMessages] = useState(initialMessages);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// 1. Join the unique channel for these two users
		const channelName = [currentUserId, recipientId].sort().join('-');
		const channel = pusherClient.subscribe(channelName);

		// 2. Bind to the 'message:new' event we trigger in the server action
		channel.bind('message:new', (newMessage: any) => {
			setMessages((prev) => [...prev, newMessage]);
		});

		return () => {
			pusherClient.unsubscribe(channelName);
			channel.unbind_all();
		};
	}, [currentUserId, recipientId]);

	// 3. Scroll to bottom whenever a new message arrives
	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages]);

	return (
		<div className="flex flex-col gap-3">
			{messages.map((msg) => {
				const isMe = msg.senderId === currentUserId;
				return (
					<div
						key={msg.id}
						className={`flex ${
							isMe ? 'justify-end' : 'justify-start'
						}`}
					>
						<div
							className={`flex flex-col max-w-[85%] ${
								isMe ? 'items-end' : 'items-start'
							}`}
						>
							<div
								className={`px-4 py-2 text-sm shadow-sm ${
									isMe
										? 'bg-rose-500 text-white rounded-2xl rounded-tr-none'
										: 'bg-white border text-gray-800 rounded-2xl rounded-tl-none'
								}`}
							>
								{msg.text}
							</div>
							<span className="text-[9px] text-gray-400 mt-1 px-1">
								{format(new Date(msg.created), 'p')}
							</span>
						</div>
					</div>
				);
			})}
			<div ref={scrollRef} />
		</div>
	);
}
