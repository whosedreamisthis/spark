import { getMemberByUserId } from '@/app/actions/memberActions';
import { getMessageThread } from '@/app/actions/messageActions';
import { auth } from '@clerk/nextjs/server';
import ChatForm from '@/components/ChatForm';
import { isOnline } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageList from '@/components/MessageList'; // Create this next

export default async function ChatPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const { userId: currentUserId } = await auth();

	const member = await getMemberByUserId(id);
	const initialMessages = await getMessageThread(id);

	if (!member || !currentUserId) return <div>Member not found</div>;

	const online = isOnline(member.lastActive);

	return (
		<div className="flex flex-col h-[calc(100vh-200px)] max-w-lg mx-auto bg-white overflow-hidden border-x">
			<div className="flex items-center justify-between p-3 border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
				<div className="flex items-center gap-3">
					<Avatar className="h-9 w-9 border">
						<AvatarImage src={member.image || '/images/user.png'} />
						<AvatarFallback>{member.name[0]}</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-sm font-bold">{member.name}</p>
						<p
							className={`text-[10px] font-medium ${
								online ? 'text-green-500' : 'text-gray-400'
							}`}
						>
							{online ? 'Online now' : 'Offline'}
						</p>
					</div>
				</div>
			</div>

			<ScrollArea className="flex-1 p-4 bg-slate-50/50">
				{/* Pass data to the Client Component for live updates */}
				<MessageList
					initialMessages={initialMessages}
					currentUserId={currentUserId}
					recipientId={id}
				/>
			</ScrollArea>

			<ChatForm recipientId={id} />
		</div>
	);
}
