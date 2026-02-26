import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import React from 'react';
import { MapPin, Calendar, Info } from 'lucide-react';
import { differenceInYears } from 'date-fns'; // Recommended: npm install date-fns

export default async function MemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const member = await getMemberByUserId(id);

	if (!member) return notFound();

	const age = differenceInYears(new Date(), new Date(member.dateOfBirth));

	return (
		<div className="p-6 space-y-6">
			{/* Header Section */}
			<section>
				<h1 className="text-3xl font-bold text-gray-900">
					{member.name}, <span className="font-light">{age}</span>
				</h1>
				<div className="flex items-center gap-1 text-gray-500 mt-1">
					<MapPin size={16} />
					<span className="text-sm">
						{member.city}, {member.country}
					</span>
				</div>
			</section>

			{/* Bio Section */}
			<section className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
				<div className="flex items-center gap-2 mb-2 text-rose-600">
					<Info size={18} />
					<h2 className="font-semibold text-sm uppercase tracking-wider">
						About Me
					</h2>
				</div>
				<p className="text-gray-700 leading-relaxed">
					{member.description || 'No description provided.'}
				</p>
			</section>

			{/* Details Grid */}
			<section className="grid grid-cols-2 gap-4">
				<div className="border rounded-xl p-3">
					<p className="text-xs text-gray-400 uppercase">Gender</p>
					<p className="font-medium">{member.gender}</p>
				</div>
				<div className="border rounded-xl p-3">
					<p className="text-xs text-gray-400 uppercase">
						Member Since
					</p>
					<p className="font-medium">
						{new Date(member.created).toLocaleDateString('en-US', {
							month: 'long',
							year: 'numeric',
						})}
					</p>
				</div>
			</section>
		</div>
	);
}
