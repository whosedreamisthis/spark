'use client';

import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import ProfileButton from './ProfileButton';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
	{ name: 'Members', href: '/members' },
	{ name: 'Lists', href: '/lists' },
	{ name: 'Messages', href: '/messages' },
];

export default function TopNav({ userId }: { userId: string | null }) {
	const pathname = usePathname();

	return (
		<nav className="sticky top-0 z-50 w-full border-b border-rose-100 bg-gradient-to-r from-rose-200/80 via-white to-rose-100/80 backdrop-blur-md">
			<div className="flex h-16 items-center justify-between px-4">
				{/* Your Logo and Links go here */}

				<Link href="/">
					<Logo />
				</Link>
				<div className="flex gap-3">
					{navItems.map((item) => {
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									'relative uppercase flex h-full items-center text-sm font-medium transition-colors hover:text-rose-500',
									isActive
										? 'text-rose-600'
										: 'text-slate-500',
								)}
							>
								{item.name}
							</Link>
						);
					})}
				</div>
				<ProfileButton userId={userId} />
			</div>
		</nav>
	);
}
