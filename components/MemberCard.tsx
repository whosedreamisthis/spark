import React from 'react';
import { Card, CardFooter } from './ui/card'; // We'll skip CardFooter to avoid default padding
import { Member } from '@/lib/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { calculateAge } from '@/lib/utils';
import LikeButton from './LikeButton';
import { isOnline } from '@/lib/utils';

type Props = {
	member: Member;
	index: number;
	likeIds: string[];
};

export default function MemberCard({ member, index, likeIds }: Props) {
	const hasLiked = likeIds.includes(member.clerkId);
	const online = isOnline(member.lastActive);

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
					<div className="absolute top-3 right-3 z-50">
						<LikeButton
							targetId={member.clerkId}
							hasLiked={hasLiked}
						/>
					</div>
					{online && (
						<div className="absolute top-3 left-3 z-10">
							<span className="relative flex h-3 w-3">
								<span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
								{/* The solid center */}
								<span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white"></span>
							</span>
						</div>
					)}
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
