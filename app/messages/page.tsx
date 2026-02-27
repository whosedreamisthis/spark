import { getMessagesByContainer } from '@/app/actions/messageActions';
import MessagesBottomBar from '@/components/messages/MessagesBottomBar';
import MessageTable from '@/components/messages/MessageTable'; // Or a list component

// app/messages/page.tsx
export default async function MessagesPage({
	searchParams,
}: {
	searchParams: Promise<{ container: string }>;
}) {
	const { container } = await searchParams;
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
