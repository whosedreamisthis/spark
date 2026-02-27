'use client';

import { useEffect } from 'react';
import { pusherClient } from '@/lib/pusher';
import { toast } from 'sonner'; // or your preferred toast library
import { useRouter, usePathname } from 'next/navigation';

export default function NotificationListener({ userId }: { userId: string }) {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		// Subscribe to a private channel for THIS logged-in user
		const channel = pusherClient.subscribe(`user-${userId}`);

		channel.bind(
			'message:new',
			(data: { senderName: string; text: string; senderId: string }) => {
				// Don't show a toast if the user is already looking at that specific chat!
				const isCurrentlyInChatWithSender = pathname.includes(
					`/members/${data.senderId}/chat`,
				);

				if (!isCurrentlyInChatWithSender) {
					toast(`New message from ${data.senderName}`, {
						description: data.text,
						action: {
							label: 'Reply',
							onClick: () =>
								router.push(`/members/${data.senderId}/chat`),
						},
					});
				}
			},
		);

		return () => {
			pusherClient.unsubscribe(`user-${userId}`);
		};
	}, [userId, pathname, router]);

	return null;
}
