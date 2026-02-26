import React from 'react';
import { Card } from './ui/card'; // We'll skip CardFooter to avoid default padding
import { Member } from '@/lib/generated/prisma/client';
import Image from 'next/image';

type Props = {
	member: Member;
};

export default function MemberCard({ member }: Props) {
	return (
		<Card className="p-0  overflow-hidden group border shadow-sm hover:shadow-md transition-shadow duration-300">
			{/* 1. The Image Container (Flush to top/sides) */}
			<div className="relative aspect-square overflow-hidden">
				<Image
					src={member.image || '/images/user.png'}
					alt={member.name}
					fill
					className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
				/>
			</div>

			{/* 2. Text Content (Internal Padding) */}
			<div className="p-4 bg-white">
				<div className="flex flex-col">
					<span className="font-semibold text-gray-900">
						{member.name}
					</span>
					<span className="text-sm text-gray-500">{member.city}</span>
				</div>
			</div>
		</Card>
	);
}
