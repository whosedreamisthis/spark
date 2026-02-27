'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal } from 'lucide-react';
import { createMessage } from '@/app/actions/messageActions';
import { useRouter } from 'next/navigation';

export default function ChatForm({ recipientId }: { recipientId: string }) {
	const [text, setText] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!text.trim()) return;

		try {
			await createMessage(recipientId, text);
			setText(''); // Clear input
			router.refresh(); // Fetch new messages from server
		} catch (error) {
			console.error('Failed to send', error);
		}
	};

	return (
		<div className="p-3 border-t bg-white">
			<form onSubmit={handleSubmit} className="flex items-center gap-2">
				<Input
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Send a message..."
					className="flex-1 rounded-full bg-slate-100 border-none h-11 focus-visible:ring-rose-500"
				/>
				<Button
					type="submit"
					size="icon"
					disabled={!text.trim()}
					className="rounded-full h-11 w-11 bg-rose-500 hover:bg-rose-600 shadow-md shrink-0"
				>
					<SendHorizontal size={20} className="text-white" />
				</Button>
			</form>
		</div>
	);
}
