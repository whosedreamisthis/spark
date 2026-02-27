import { getMemberByUserId } from '@/app/actions/memberActions';
import { getMessageThread } from '@/app/actions/messageActions';
import { auth } from '@clerk/nextjs/server';
import ChatForm from '@/components/ChatForm'; // We will create this below
import { isOnline } from '@/lib/utils';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default async function ChatPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params; // This is the recipient's ID
	const { userId: currentUserId } = await auth();

	// Fetch real data
	const member = await getMemberByUserId(id);
	const messages = await getMessageThread(id);

	if (!member) return <div>Member not found</div>;

	const online = isOnline(member.lastActive);

	return (
		<div className="flex flex-col h-[calc(100vh-200px)] max-w-lg mx-auto bg-white overflow-hidden border-x">
			{/* 1. Header with dynamic data */}
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
				{/* ... buttons ... */}
			</div>

			{/* 2. Messages */}
			<ScrollArea className="flex-1 p-4 bg-slate-50/50">
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
										{new Date(
											msg.created,
										).toLocaleTimeString([], {
											hour: '2-digit',
											minute: '2-digit',
										})}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</ScrollArea>

			{/* 3. New Message Input (Client Component) */}
			<ChatForm recipientId={id} />
		</div>
	);
}
