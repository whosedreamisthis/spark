'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit2, X, Info, Check } from 'lucide-react';
import { updateMemberProfile } from '@/app/actions/userActions';
import { cn } from '@/lib/utils';

const INTEREST_GROUPS = {
	'Outdoors & Sports': [
		'Hiking',
		'Cycling',
		'Swimming',
		'Fishing',
		'Camping',
		'Skiing',
		'Sports',
		'Yoga',
	],
	'Creativity & Hobbies': [
		'Photography',
		'Art',
		'Writing',
		'Gardening',
		'Tech',
		'Gaming',
		'Astronomy',
	],
	'Culture & Lifestyle': [
		'Music',
		'Movies',
		'Reading',
		'Travel',
		'Dancing',
		'History',
		'Fashion',
		'Volunteering',
		'Meditation',
	],
	'Food & Social': ['Cooking', 'Coffee', 'Wine', 'Pets', 'Board Games'],
};

export default function EditAboutSection({ member }: { member: any }) {
	const [isEditing, setIsEditing] = useState(false);

	// State handles the array for UI toggling
	const [selectedInterests, setSelectedInterests] = useState<string[]>(
		member.interests
			? member.interests.split(',').map((i: string) => i.trim())
			: [],
	);

	const toggleInterest = (interest: string) => {
		setSelectedInterests((prev) =>
			prev.includes(interest)
				? prev.filter((i) => i !== interest)
				: [...prev, interest],
		);
	};

	return (
		<Card className="border-none shadow-sm bg-white">
			<CardContent className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h3 className="text-lg font-semibold flex items-center gap-2">
						<Info size={20} className="text-rose-500" /> About &
						Interests
					</h3>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setIsEditing(!isEditing)}
					>
						{isEditing ? <X size={18} /> : <Edit2 size={18} />}
					</Button>
				</div>

				{isEditing ? (
					<form
						action={async (formData) => {
							// Convert the array to comma separated string for the database
							formData.set(
								'interests',
								selectedInterests.join(', '),
							);
							await updateMemberProfile(formData);
							setIsEditing(false);
						}}
						className="space-y-6"
					>
						<div className="space-y-2">
							<label className="text-sm font-bold text-gray-500 uppercase">
								Bio
							</label>
							<Textarea
								name="description"
								defaultValue={member.description || ''}
								rows={4}
								className="resize-none focus-visible:ring-rose-500"
							/>
						</div>

						<div className="space-y-4">
							<label className="text-sm font-bold text-gray-500 uppercase">
								Select Interests
							</label>

							{Object.entries(INTEREST_GROUPS).map(
								([groupName, options]) => (
									<div key={groupName} className="space-y-2">
										<h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
											{groupName}
										</h4>
										<div className="flex flex-wrap gap-2">
											{options.map((option) => {
												const isSelected = selectedInterests.includes(
													option,
												);
												return (
													<button
														key={option}
														type="button"
														onClick={() =>
															toggleInterest(
																option,
															)
														}
														className={cn(
															'flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all',
															isSelected
																? 'bg-rose-500 text-white shadow-sm'
																: 'bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-rose-500',
														)}
													>
														{option}
														{isSelected && (
															<Check size={12} />
														)}
													</button>
												);
											})}
										</div>
									</div>
								),
							)}
						</div>

						<Button
							type="submit"
							className="w-full bg-rose-500 hover:bg-rose-600 transition-colors"
						>
							Save About Section
						</Button>
					</form>
				) : (
					/* REPLICA VIEW */
					<div className="space-y-6">
						<div>
							<h4 className="text-sm font-bold text-gray-400 uppercase mb-2">
								Bio
							</h4>
							<p className="text-gray-600 leading-relaxed italic">
								{member.description || 'No bio added yet.'}
							</p>
						</div>
						<div>
							<h4 className="text-sm font-bold text-gray-400 uppercase mb-3">
								Interests
							</h4>
							<div className="flex flex-wrap gap-2">
								{selectedInterests.length > 0 ? (
									selectedInterests.map((interest) => (
										<span
											key={interest}
											className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-sm font-medium"
										>
											{interest}
										</span>
									))
								) : (
									<span className="text-gray-400 text-sm italic">
										No interests selected.
									</span>
								)}
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
