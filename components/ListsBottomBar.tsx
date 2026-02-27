'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Heart, Users, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ListsBottomBar() {
	const searchParams = useSearchParams();
	const currentTab = searchParams.get('type') || 'target';

	const navLinks = [
		{ name: 'Mutual', value: 'mutual', icon: Repeat },
		{ name: 'Likes Me', value: 'target', icon: Users },
		{ name: 'I Like', value: 'source', icon: Heart },
	];

	return (
		<nav className="sticky bottom-0 z-50 w-full border-t border-rose-100 bg-white/80 backdrop-blur-md pb-safe">
			<div className="flex justify-around items-center h-16">
				{navLinks.map((link) => {
					const Icon = link.icon;
					const isActive = currentTab === link.value;

					return (
						<Link
							key={link.value}
							href={`/lists?type=${link.value}`}
							replace
							className={cn(
								'flex flex-col items-center justify-center w-full h-full transition-colors',
								isActive
									? 'text-rose-500'
									: 'text-gray-500 hover:text-rose-400',
							)}
						>
							<Icon
								size={20}
								className={cn(isActive && 'fill-rose-500/10')}
							/>
							<span className="text-[10px] font-medium mt-1">
								{link.name}
							</span>
							{/* Optional Active Indicator Dot */}
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
