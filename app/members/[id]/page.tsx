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
import Image from 'next/image';
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

	return (
		<div className="p-6 space-y-8 max-w-2xl mx-auto">
			<section className="flex flex-col md:flex-row gap-8 items-start">
				{/* 1. The Image Container (Card Sized) */}
				<div className="relative w-full max-w-[240px] aspect-square overflow-hidden rounded-xl shadow-sm border border-gray-100 group">
					<Image
						src={member.image || '/images/user.png'}
						alt={member.name}
						fill
						priority
						// Since it's max 300px on desktop, we optimize the sizes prop:
						sizes="(max-width: 768px) 100vw, 300px"
						className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
					/>
				</div>

				{/* 2. The Data Section (Next to the image) */}
				<div className="flex-1 space-y-4">
					<div>
						<h1 className="text-4xl font-bold text-gray-900">
							{member.name},{' '}
							<span className="font-light">{age}</span>
						</h1>
						<p className="text-gray-500 flex items-center gap-1">
							<MapPin size={18} /> {member.city}, {member.country}
						</p>
					</div>

					{/* Interests Section */}
					<div className="flex flex-wrap gap-2">
						{member.interests?.split(',').map((interest) => (
							<span
								key={interest}
								className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-semibold"
							>
								{interest.trim()}
							</span>
						))}
					</div>

					{/* Brief description or other quick stats can go here */}
					<p className="text-gray-600 border-t pt-4 italic">
						Looking for: {member.lookingFor}
					</p>
				</div>
			</section>

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
