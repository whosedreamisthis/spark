'use client';

import { Member } from '@/lib/generated/prisma/client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camera, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';

type Props = {
	member: Member;
};

export default function MemberBottomBar({ member }: Props) {
	const pathname = usePathname();
	const basePath = `/members/${member.clerkId}`;

	// Removed Profile; kept only specific sub-actions
	const navLinks = [
		{ name: 'Photos', href: `${basePath}/photos`, icon: Camera },
		{ name: 'Chat', href: `${basePath}/chat`, icon: MessageCircle },
	];

	return (
		<nav className="fixed bottom-0 left-0 z-50 w-full border-t border-rose-100 bg-white/80 backdrop-blur-md px-6 py-2">
			<div className="max-w-screen-xl mx-auto flex justify-between items-center">
				{/* Left Side: Name/Avatar acts as the Profile Link */}
				<Link href={basePath} className="flex items-center gap-3 group">
					<div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-rose-400 shadow-sm transition group-hover:ring-2 group-hover:ring-rose-200">
						<Image
							src={member.image || '/images/user.png'}
							alt={member.name}
							className="object-cover"
							fill
							sizes="40px"
						/>
					</div>
					<div className="flex flex-col">
						<span className="font-bold text-sm text-gray-800 leading-none">
							{member.name}
						</span>
						<span className="text-[10px] text-rose-500 font-medium mt-0.5">
							{/* Online */}
						</span>
					</div>
				</Link>

				{/* Right Side: Action Icons justified to the edge */}
				<div className="flex items-center gap-2">
					{navLinks.map((nl) => {
						const Icon = nl.icon;
						const isActive = pathname === nl.href;

						return (
							<Link
								key={nl.name}
								href={nl.href}
								className={`flex flex-col items-center justify-center min-w-[64px] py-1 rounded-xl transition-all ${
									isActive
										? 'text-rose-600 bg-rose-50'
										: 'text-gray-500 hover:text-rose-400 hover:bg-gray-50'
								}`}
							>
								<Icon
									size={22}
									strokeWidth={isActive ? 2.5 : 2}
								/>
								<span className="text-[10px] font-bold mt-1 uppercase tracking-wider">
									{nl.name}
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
