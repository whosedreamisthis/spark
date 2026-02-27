// app/profile/edit/_components/EditAboutSection.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Edit2, X, Info } from 'lucide-react';
import { updateMemberProfile } from '@/app/actions/userActions';

export default function EditAboutSection({ member }: { member: any }) {
	const [isEditing, setIsEditing] = useState(false);

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
						action={async (fd) => {
							await updateMemberProfile(fd);
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
								rows={5}
								placeholder="Tell people about yourself..."
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-bold text-gray-500 uppercase">
								Interests (comma separated)
							</label>
							<Input
								name="interests"
								defaultValue={member.interests || ''}
								placeholder="Hiking, Cooking, Music..."
							/>
						</div>
						<Button
							type="submit"
							className="w-full bg-rose-500 hover:bg-rose-600"
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
								{member.interests
									?.split(',')
									.map((interest: string) => (
										<span
											key={interest}
											className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium"
										>
											{interest.trim()}
										</span>
									)) || (
									<span className="text-gray-400 text-sm italic">
										No interests listed.
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
