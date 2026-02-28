import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardFooter } from './ui/card'; // We'll skip CardFooter to avoid default padding
import { Member } from '@/lib/generated/prisma/client';
import Image from 'next/image';
import Link from 'next/link';

const LikeButton = dynamic(() => import('./LikeButton'), {
	ssr: true, // We keep SSR true so the button shows up in the HTML immediately
	loading: () => <div className="w-8 h-8" />, // Optional: a small placeholder while JS loads
});

type MemberSummary = Pick<
	Member,
	'id' | 'name' | 'clerkId' | 'image' | 'city' | 'country'
> & {
	age: number; // Pre-calculated on server
	isOnline: boolean; // Pre-calculated on server
};

type Props = {
	member: MemberSummary;
	index: number;
	hasLiked: boolean;
};

export default function MemberCard({ member, index, hasLiked }: Props) {
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
						fetchPriority="high" // Add this for modern browsers
						loading="eager" // Add this to skip the IntersectionObserver
						sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
						className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
					/>
					<div className="absolute top-0 right-3 z-50">
						<LikeButton
							targetId={member.clerkId}
							hasLiked={hasLiked}
						/>
					</div>
					{member.isOnline && (
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
							{member.name}, {member.age}
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
