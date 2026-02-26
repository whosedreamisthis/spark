import React from 'react';
import { getMembers } from '../actions/memberActions';
import MemberCard from '@/components/MemberCard';

export default async function MembersPage() {
	const members = await getMembers();

	return (
		<div className="m-10 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{members &&
				members.map((member) => {
					console.log('memeber', member.name, member.clerkId);
					// return <li key={member.id}>{member.name}</li>;
					return <MemberCard key={member.id} member={member} />;
				})}
		</div>
	);
}
