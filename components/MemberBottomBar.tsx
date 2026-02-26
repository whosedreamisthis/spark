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
		{ name: 'Profile', href: `${basePath}` },
		{ name: 'Photos', href: `${basePath}/photos` },
		{ name: 'Chat', href: `${basePath}/chat` },
	];

	return (
		<nav className="sticky bottom-0 flex flex-row justify-between w-full mt-10 items-center px-4 py-1 items-end">
			<div className="flex items-center gap-2">
				<div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-rose-500">
					<Image
						src={member.image || '/images/user.png'}
						alt={member.name}
						fill
						className="object-cover"
					/>
				</div>
				<span className="font-semibold text-sm">{member.name}</span>
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
