import React from 'react';
import { Card, CardFooter } from './ui/card'; // We'll skip CardFooter to avoid default padding
import { Member } from '@/lib/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { calculateAge } from '@/lib/utils';

type Props = {
	member: Member;
	index: number;
};

export default function MemberCard({ member, index }: Props) {
	return (
		<Card className="relative flex flex-col p-0 overflow-hidden group border shadow-sm hover:shadow-md transition-shadow duration-300">
			<Link href={`/members/${member.clerkId}`}>
				{/* 1. The Image Container - Added 'block' and removed aspect-square if it conflicts */}
				<div className="relative aspect-square overflow-hidden block">
					<Image
						src={member.image || '/images/user.png'}
						alt={member.name}
						fill
						priority={index < 4}
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
					/>
				</div>

				{/* 2. Text Content - Removed margin, ensure it sits flush against the div above */}
				<div className="flex justitfy-start absolute bottom-0 z-10 p-2  w-full -mt-6.5 bg-gradient-to-t from-gray-700/90  to-white/0">
					<div className="flex flex-col text-white">
						<span className="font-semibold ">
							{member.name}, {calculateAge(member.dateOfBirth)}
						</span>
						<span className="text-sm text-white/50">
							{member.city}
						</span>
					</div>
				</div>
			</Link>
		</Card>
	);
}
