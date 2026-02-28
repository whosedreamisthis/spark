import { getMessagesByContainer } from '@/app/actions/messageActions';
import EmptyState from '@/components/messages/EmptyState';
import MessagesBottomBar from '@/components/messages/MessagesBottomBar';
import MessageTable from '@/components/messages/MessageTable';
import { syncUser } from '@/lib/userSync';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function MessagesPage({
	searchParams,
}: {
	searchParams: Promise<{ container: string }>;
}) {
	await syncUser();
	// 1. Check for session
	const { userId, redirectToSignIn } = await auth();
	const { container } = await searchParams;

	// 2. If no user, show the login prompt
	if (!userId) {
		redirect('/');
	}

	// 3. User is logged in, fetch messages
	const messages = await getMessagesByContainer(container || 'inbox');

	return (
		<div className="flex flex-col min-h-screen pb-20 bg-slate-50/30">
			<div className="p-4 flex-1">
				<h1 className="text-2xl font-bold mb-6 px-1">
					{container === 'outbox' ? 'Sent Messages' : 'Inbox'}
				</h1>

				{messages.length === 0 ? (
					<EmptyState container={container || 'inbox'} />
				) : (
					<MessageTable messages={messages} />
				)}
			</div>

			<MessagesBottomBar />
		</div>
	);
}
