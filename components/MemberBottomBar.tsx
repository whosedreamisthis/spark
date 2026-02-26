import { Member } from '@/lib/generated/prisma/client';
import React from 'react';
import { Card } from './ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Divide } from 'lucide-react';
type Props = {
	member: Member;
};
export default function MemberBottomBar({ member }: Props) {
	const basePath = `/members/${member.clerkId}`;
	const navLinks = [
		// { name: 'Profile', href: `${basePath}` },
		{ name: 'Photos', href: `${basePath}/photos` },
		{ name: 'Chat', href: `${basePath}/chat` },
	];

	return (
		<nav className="flex justify-between items-center sticky bottom-0 z-50 w-full border-b border-rose-100 bg-gradient-to-r from-rose-200/80 via-white to-rose-100/80 backdrop-blur-md">
			<div>
				<Link href={basePath} className="flex items-center gap-2">
					<div className="ml-2 relative h-8 w-8 overflow-hidden rounded-full border-1 border-rose-400">
						<Image
							src={member.image || '/images/user.png'}
							alt={member.name}
							className="object-cover"
							fill
							sizes="32px"
						/>
					</div>
					<span className="font-semibold text-sm">{member.name}</span>
				</Link>
			</div>

			{navLinks.map((nl, index) => {
				return (
					<Link className="mx-4 my-2" key={index} href={nl.href}>
						{nl.name}
					</Link>
				);
			})}
		</nav>
	);
}
