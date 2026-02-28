import React from 'react';
import {
	fetchLikedMembers,
	fetchCurrentUserLikeIds,
} from '@/app/actions/likeActions';
import MemberCard from '@/components/MemberCard';
// import ListsBottomBar from '@/components/ListsBottomBar';
import { auth } from '@clerk/nextjs/server';
import { syncUser } from '@/lib/userSync';
import { redirect } from 'next/navigation';

export default async function ListsPage({
	searchParams,
}: {
	searchParams: Promise<{ type?: string }>;
}) {
	await syncUser();
	const { type } = await searchParams;
	const currentType = type || 'target';
	const { userId, redirectToSignIn } = await auth();

	if (!userId) {
		redirect('/');
	}

	// 1. Fetch both the members for the list AND the current user's liked IDs
	const [members, likeIds] = await Promise.all([
		fetchLikedMembers(currentType),
		fetchCurrentUserLikeIds(),
	]);
	const likedSet = new Set(likeIds);

	return (
		<div className="flex flex-col min-h-screen pb-20">
			{/* pb-20 prevents bar from covering cards */}
			<div className="flex-1 p-6 max-w-7xl mx-auto w-full">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-gray-900">
						{currentType === 'mutual' && 'Mutual Matches'}
						{currentType === 'source' && 'Members I Liked'}
						{currentType === 'target' && 'Members who like me'}
					</h1>
					<p className="text-sm text-gray-500 font-medium">
						{members?.length === 0
							? 'No sparks found here yet.'
							: `Showing ${members?.length} potential connections`}
					</p>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
					{members?.map(
						(member, index) =>
							member && (
								<MemberCard
									key={member.id}
									member={member}
									index={index}
									hasLiked={likedSet.has(member.clerkId)}
								/>
							),
					)}
				</div>

				{members?.length === 0 && (
					<div className="flex flex-col items-center justify-center py-32 text-center">
						<div className="bg-rose-50 p-6 rounded-full mb-4 animate-pulse">
							<span className="text-4xl">✨</span>
						</div>
						<p className="text-gray-400 font-medium italic">
							Nothing to see here... yet!
						</p>
					</div>
				)}
			</div>
			{/* <ListsBottomBar /> */}
		</div>
	);
}
