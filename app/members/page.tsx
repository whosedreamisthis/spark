export const dynamic = 'force-dynamic';
import React, { Suspense } from 'react';
import { getMembers } from '../actions/memberActions';
import MemberCard from '@/components/MemberCard';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';
import { syncUser } from '@/lib/userSync';
import MemberGridSkeleton from '@/components/MemberGridSkeleton';

export default async function MembersPage() {
	return (
		<div className="m-10">
			<h1 className="text-2xl font-bold mb-6">Members</h1>
			<Suspense fallback={<MemberGridSkeleton />}>
				<MembersList />
			</Suspense>
		</div>
	);
}

// Create this helper component in the same file or a new one
async function MembersList() {
	const [members, likeIds, _] = await Promise.all([
		getMembers(),
		fetchCurrentUserLikeIds(),
		syncUser(),
	]);

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
			{members?.map((member, index) => (
				<MemberCard
					key={member.id}
					member={member}
					index={index}
					likeIds={likeIds}
				/>
			))}
		</div>
	);
}
