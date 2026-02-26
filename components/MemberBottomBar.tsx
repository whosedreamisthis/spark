import { Member } from '@/lib/generated/prisma/client';
import React from 'react';
import { Card } from './ui/card';
import Link from 'next/link';

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
		<div className="sticky bottom-0 flex flex-row justify-between w-full mt-10 items-center">
			{navLinks.map((nl, index) => {
				return (
					<Link className="mx-4 my-2" key={index} href={nl.href}>
						{nl.name}
					</Link>
				);
			})}
		</div>
	);
}
