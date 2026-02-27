'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit2, X, Camera, MapPin } from 'lucide-react';
import Image from 'next/image';
import { updateMemberProfile } from '@/app/actions/userActions';
import Link from 'next/link';

export default function EditHeaderSection({ member }: { member: any }) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<section className="relative group">
			{isEditing ? (
				<Card className="border-2 border-rose-500 shadow-lg">
					<CardContent className="p-6">
						<form
							action={async (fd) => {
								await updateMemberProfile(fd);
								setIsEditing(false);
							}}
							className="space-y-4"
						>
							<div className="flex justify-between items-center">
								<h3 className="font-bold text-rose-500">
									Edit Basic Info
								</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setIsEditing(false)}
									type="button"
								>
									<X size={18} />
								</Button>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-1">
									<label className="text-xs font-bold uppercase text-gray-400">
										Display Name
									</label>
									<Input
										name="name"
										defaultValue={member.name}
									/>
								</div>
								<div className="space-y-1">
									<label className="text-xs font-bold uppercase text-gray-400">
										City
									</label>
									<Input
										name="city"
										defaultValue={member.city}
									/>
								</div>
								<div className="space-y-1">
									<label className="text-xs font-bold uppercase text-gray-400">
										Country
									</label>
									<Input
										name="country"
										defaultValue={member.country}
									/>
								</div>
							</div>
							<Button
								type="submit"
								className="w-full bg-rose-500 hover:bg-rose-600"
							>
								Update Profile Header
							</Button>
						</form>
					</CardContent>
				</Card>
			) : (
				/* REPLICA VIEW */
				<div className="flex flex-col md:flex-row items-center gap-6">
					<div className="relative h-40 w-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl group/img">
						<Image
							src={member.image || '/images/user.png'}
							alt={member.name}
							fill
							className="object-cover"
						/>
						<Link
							href="/profile/edit/photos"
							className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity"
						>
							<Camera className="text-white" />
						</Link>
					</div>

					<div className="flex-1 text-center md:text-left space-y-2">
						<div className="flex flex-col md:flex-row md:items-center gap-4">
							<h1 className="text-3xl font-bold text-gray-900">
								{member.name}
							</h1>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsEditing(true)}
								className="rounded-full gap-2"
							>
								<Edit2 size={14} /> Edit Info
							</Button>
						</div>
						<div className="flex items-center justify-center md:justify-start gap-1 text-gray-500">
							<MapPin size={16} className="text-rose-500" />
							<span>
								{member.city}, {member.country}
							</span>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
