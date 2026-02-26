import { getMemberByUserId } from '@/app/actions/memberActions';
import { notFound } from 'next/navigation';
import React from 'react';
import {
	MapPin,
	Info,
	Heart,
	Briefcase,
	GraduationCap,
	Ruler,
	Globe2,
	Quote,
	Calendar,
} from 'lucide-react';
import { differenceInYears } from 'date-fns';

export default async function MemberPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const member = await getMemberByUserId(id);

	if (!member) return notFound();

	const age = differenceInYears(new Date(), new Date(member.dateOfBirth));
	const interests = member.interests ? member.interests.split(',') : [];

	console.log('member', member);

	return (
		<div className="p-6 space-y-8 max-w-2xl mx-auto">
			{/* 1. Header Section */}
			<section>
				<h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
					{member.name},{' '}
					<span className="font-light text-gray-500">{age}</span>
				</h1>
				<div className="flex items-center gap-1 text-gray-500 mt-2">
					<MapPin size={18} className="text-rose-500" />
					<span className="text-base font-medium">
						{member.city}, {member.country}
					</span>
				</div>
			</section>

			{/* 2. Interests / Vibe Section */}
			{interests.length > 0 && (
				<section className="flex flex-wrap gap-2">
					{interests.map((interest) => (
						<span
							key={interest}
							className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold border border-gray-200"
						>
							{interest.trim()}
						</span>
					))}
				</section>
			)}

			{/* 3. Personal Prompt Section */}
			{member.promptQuestion && (
				<section className="bg-rose-500 text-white p-6 rounded-3xl shadow-sm relative overflow-hidden">
					<Quote className="absolute -top-2 -left-2 opacity-20 w-16 h-16" />
					<p className="text-xs uppercase tracking-widest font-bold opacity-80 mb-2">
						{member.promptQuestion}
					</p>
					<p className="text-xl font-serif italic">
						"{member.promptAnswer}"
					</p>
				</section>
			)}

			{/* 4. Bio Section */}
			<section className="space-y-3">
				<div className="flex items-center gap-2 text-gray-900 border-b pb-2">
					<Info size={20} className="text-rose-500" />
					<h2 className="font-bold text-lg">About Me</h2>
				</div>
				<p className="text-gray-600 leading-relaxed text-lg">
					{member.description || 'No description provided.'}
				</p>
			</section>

			{/* 5. Life Details Grid */}
			<section className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<DetailItem
					icon={<Briefcase size={18} />}
					label="Profession"
					value={member.profession}
				/>
				<DetailItem
					icon={<GraduationCap size={18} />}
					label="Education"
					value={member.education}
				/>
				<DetailItem
					icon={<Ruler size={18} />}
					label="Height"
					value={`${member.height}cm`}
				/>
				<DetailItem
					icon={<Globe2 size={18} />}
					label="Ethnicity"
					value={member.ethnicity}
				/>
				<DetailItem
					icon={<Heart size={18} />}
					label="Looking for"
					value={member.lookingFor}
				/>
				<DetailItem
					icon={<Calendar size={18} />}
					label="Member Since"
					value={new Date(member.created).toLocaleDateString(
						'en-US',
						{ month: 'long', year: 'numeric' },
					)}
				/>
			</section>
		</div>
	);
}

// Helper component for the grid items
function DetailItem({
	icon,
	label,
	value,
}: {
	icon: React.ReactNode;
	label: string;
	value: string | null | undefined;
}) {
	if (!value) return null;
	return (
		<div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 border border-gray-100">
			<div className="text-rose-500">{icon}</div>
			<div>
				<p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter leading-none mb-1">
					{label}
				</p>
				<p className="font-semibold text-gray-800 leading-none">
					{value}
				</p>
			</div>
		</div>
	);
}
