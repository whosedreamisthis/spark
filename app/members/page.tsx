import React from 'react';
import { getMembers } from '../actions/memberActions';
import MemberCard from '@/components/MemberCard';

export default async function MembersPage() {
	const members = await getMembers();

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
						/>
					);
				})}
		</div>
	);
}
