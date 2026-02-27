'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Info, Ruler, Globe, User2, Check, X } from 'lucide-react';
import { updateMemberProfile } from '@/app/actions/userActions';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export default function EditEssentialsSection({ member }: { member: any }) {
	const [isEditing, setIsEditing] = useState(false);

	return (
		<Card className="border-none shadow-sm bg-white overflow-visible">
			<CardContent className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h3 className="text-lg font-semibold flex items-center gap-2">
						<Info size={20} className="text-rose-500" /> Essentials
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
						className="space-y-4"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							{/* Height */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-gray-400 uppercase">
									Height (cm)
								</label>
								<Input
									name="height"
									type="number"
									defaultValue={member.height || ''}
								/>
							</div>

							{/* Gender */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-gray-400 uppercase">
									Gender
								</label>
								<Select
									name="gender"
									defaultValue={member.gender}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="male">
											Male
										</SelectItem>
										<SelectItem value="female">
											Female
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Ethnicity */}
							<div className="space-y-1">
								<label className="text-xs font-bold text-gray-400 uppercase">
									Ethnicity
								</label>
								<Select
									name="ethnicity"
									defaultValue={member.ethnicity}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select ethnicity" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Caucasian">
											Caucasian
										</SelectItem>
										<SelectItem value="black">
											Black
										</SelectItem>
										<SelectItem value="hispanic">
											Hispanic
										</SelectItem>
										<SelectItem value="asian">
											Asian
										</SelectItem>
										<SelectItem value="middle-eastern">
											Middle Eastern
										</SelectItem>
										<SelectItem value="other">
											Other
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<Button
							type="submit"
							className="w-full bg-rose-500 hover:bg-rose-600"
						>
							Save Essentials
						</Button>
					</form>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
						{/* Height */}
						<div className="flex items-center gap-3">
							<Ruler className="text-slate-400" size={20} />
							<div>
								<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
									Height
								</p>
								<p className="text-sm font-medium text-slate-700">
									{member.height
										? `${member.height}cm`
										: 'Not set'}
								</p>
							</div>
						</div>

						{/* Ethnicity */}
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

						{/* Gender */}
						<div className="flex items-center gap-3">
							<User2 className="text-slate-400" size={20} />
							<div>
								<p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
									Gender
								</p>
								<p className="text-sm font-medium text-slate-700 capitalize">
									{member.gender || 'Not set'}
								</p>
							</div>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
