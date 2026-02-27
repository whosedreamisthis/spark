import React from 'react';
import { getMembers } from '../actions/memberActions';
import MemberCard from '@/components/MemberCard';
import { fetchCurrentUserLikeIds } from '../actions/likeActions';
import { syncUser } from '@/lib/userSync';

export default async function MembersPage() {
	await syncUser();
	const members = await getMembers();
	const likeIds = await fetchCurrentUserLikeIds();

	return (
		<div className="m-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
			{members &&
				members.map((member, index) => {
					// return <li key={member.id}>{member.name}</li>;
					return (
						<MemberCard
							key={member.id}
							member={member}
							index={index}
							likeIds={likeIds}
						/>
					);
				})}
		</div>
	);
}
