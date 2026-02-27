'use client';

import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export default function MessageTable({ messages }: { messages: any[] }) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const isOutbox = searchParams.get('container') === 'outbox';

	return (
		<div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
			{messages.map((message, index) => {
				const displayUser = isOutbox
					? message.recipient
					: message.sender;
				const isRead = !!message.dateRead;
				const isLast = index === messages.length - 1;

				return (
					<div
						key={message.id}
						onClick={() =>
							router.push(`/members/${displayUser.clerkId}/chat`)
						}
						className={cn(
							'relative flex items-center px-4 py-3 cursor-pointer transition-colors active:bg-slate-100',
							!isRead && !isOutbox
								? 'bg-rose-50/40'
								: 'hover:bg-slate-50',
							!isLast && 'border-b border-slate-100', // The "Table" divider
						)}
					>
						{/* 1. Unread Indicator Stripe */}
						{!isRead && !isOutbox && (
							<div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500" />
						)}

						{/* 2. Compact Avatar */}
						<Avatar className="h-10 w-10 shrink-0">
							<AvatarImage
								src={displayUser.image || '/images/user.png'}
							/>
							<AvatarFallback>
								{displayUser.name[0]}
							</AvatarFallback>
						</Avatar>

						{/* 3. Text Info - Tightened */}
						<div className="flex-1 ml-3 min-w-0">
							<div className="flex justify-between items-baseline">
								<span
									className={cn(
										'text-sm truncate',
										!isRead && !isOutbox
											? 'font-bold text-slate-900'
											: 'font-medium text-slate-700',
									)}
								>
									{displayUser.name}
								</span>
								<span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
									{format(new Date(message.created), 'HH:mm')}
								</span>
							</div>

							<div className="flex justify-between items-center">
								<p
									className={cn(
										'text-xs truncate pr-2',
										!isRead && !isOutbox
											? 'text-slate-900 font-medium'
											: 'text-slate-500',
									)}
								>
									{message.text}
								</p>
								{/* Outbox small status or just the arrow */}
								<ChevronRight
									size={14}
									className="text-slate-300 shrink-0"
								/>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}
