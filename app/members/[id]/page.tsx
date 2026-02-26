import { getMemberByUserId } from '@/app/actions/memberActions';
import MemberBottomBar from '@/components/MemberBottomBar';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function MemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const member = await getMemberByUserId(id);

	if (!member) return notFound();
	return (
		<div className="relative flex">
			<div className="flex-grow">{member?.name}</div>
		</div>
	);
}
