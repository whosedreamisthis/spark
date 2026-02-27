import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { calculateAge } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Edit2,
	MapPin,
	Calendar,
	Camera,
	Settings,
	Globe,
	User2,
	Info,
	Ruler,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function ProfilePage() {
	const { userId } = await auth();

	const member = await prisma.member.findUnique({
		where: { clerkId: userId as string },
	});

	if (!member) return <div>Profile not found...</div>;

	return (
		<div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-24">
			{/* 1. Profile Header / Hero Section */}
			<section className="relative group">
				<div className="flex flex-col md:flex-row items-center gap-6">
					<div className="relative h-40 w-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
						<Image
							src={member.image || '/images/user.png'}
							alt={member.name}
							fill
							className="object-cover"
						/>
						<Link
							href="/profile/edit/photos"
							className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
						>
							<Camera className="text-white" />
						</Link>
					</div>

					<div className="flex-1 text-center md:text-left space-y-2">
						<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
							<h1 className="text-3xl font-bold text-gray-900">
								{member.name},{' '}
								{calculateAge(member.dateOfBirth)}
							</h1>
							<Button
								asChild
								variant="outline"
								size="sm"
								className="rounded-full gap-2"
							>
								<Link href="/profile/edit">
									<Edit2 size={14} /> Edit Profile
								</Link>
							</Button>
						</div>

						<div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500">
							<div className="flex items-center gap-1">
								<MapPin size={16} className="text-rose-500" />
								<span className="text-sm">
									{member.city}, {member.country}
								</span>
							</div>
							<div className="flex items-center gap-1">
								<Calendar size={16} />
								<span className="text-sm">
									Joined{' '}
									{new Date(
										member.created,
									).toLocaleDateString()}
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 2. Stats / Fast Info Bar */}
			<div className="grid grid-cols-3 gap-4">
				{[
					{ label: 'Photos', value: '6' },
					{ label: 'Matches', value: '12' },
					{ label: 'Likes', value: '48' },
				].map((stat) => (
					<Card
						key={stat.label}
						className="bg-rose-50/50 border-rose-100 shadow-none"
					>
						<CardContent className="p-4 text-center">
							<p className="text-2xl font-bold text-rose-600">
								{stat.value}
							</p>
							<p className="text-xs text-gray-500 uppercase font-semibold">
								{stat.label}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			
			{/* 3. Detailed Bio Section */}
			<Card className="border-none shadow-sm bg-white">
				<CardContent className="p-6 space-y-6">
					<div>
						<h3 className="text-lg font-semibold mb-2">About Me</h3>
						<p className="text-gray-600 leading-relaxed italic">
							{member.description ||
								"You haven't added a bio yet. Tell people a bit about yourself!"}
						</p>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-3">
							Interests
						</h3>
						<div className="flex flex-wrap gap-2">
							{member.interests?.split(',').map((interest) => (
								<span
									key={interest}
									className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
								>
									{interest.trim()}
								</span>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
			<p>hedfrDDCdddddddddddddddddd</p>

			<Card className="border-none shadow-sm bg-white">
				<CardContent className="p-6">
					<h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
						<Info size={20} className="text-rose-500" />
						Essentials
					</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						<div className="flex items-center gap-3">
							<Ruler className="text-slate-400" size={20} />
							<div>
								<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
									Height
								</p>
								<p className="text-sm font-medium text-slate-700">
									{member.height || 'Not set'}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<Globe className="text-slate-400" size={20} />
							<div>
								<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
									Ethnicity
								</p>
								<p className="text-sm font-medium text-slate-700">
									{member.ethnicity || 'Not set'}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-3">
							<User2 className="text-slate-400" size={20} />
							<div>
								<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
									Gender
								</p>
								<p className="text-sm font-medium text-slate-700 capitalize">
									{member.gender}
								</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* 4. Action Center */}
			<div className="flex flex-col gap-3">
				<Button
					asChild
					variant="ghost"
					className="justify-between h-14 px-6 bg-white border border-gray-100"
				>
					<Link href="/settings">
						<div className="flex items-center gap-3">
							<Settings size={20} className="text-gray-400" />
							<span>Account Settings</span>
						</div>
						<span className="text-gray-300">→</span>
					</Link>
				</Button>
			</div>
		</div>
	);
}
