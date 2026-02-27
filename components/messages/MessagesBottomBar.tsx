'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Inbox, SendHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessagesBottomBar() {
	const searchParams = useSearchParams();
	const currentTab = searchParams.get('container') || 'inbox';

	const navLinks = [
		{ name: 'Inbox', value: 'inbox', icon: Inbox },
		{ name: 'Outbox', value: 'outbox', icon: SendHorizontal },
	];

	return (
		<nav className="fixed bottom-0 left-0 z-50 w-full border-t border-rose-100 bg-white/80 backdrop-blur-md pb-safe">
			<div className="flex justify-around items-center h-16">
				{navLinks.map((link) => {
					const Icon = link.icon;
					const isActive = currentTab === link.value;

					return (
						<Link
							key={link.value}
							href={`/messages?container=${link.value}`}
							replace
							className={cn(
								'relative flex flex-col items-center justify-center w-full h-full transition-colors',
								isActive
									? 'text-rose-500'
									: 'text-gray-500 hover:text-rose-400',
							)}
						>
							<Icon
								size={22}
								className={cn(isActive && 'fill-rose-500/10')}
							/>
							<span className="text-[10px] font-medium mt-1">
								{link.name}
							</span>
							{isActive && (
								<div className="absolute bottom-1 w-1 h-1 bg-rose-500 rounded-full" />
							)}
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
