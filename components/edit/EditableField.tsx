'use client';

import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import { updateMemberField } from '@/app/actions/memberActions';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner'; // Recommended for feedback

interface Props {
	label: string;
	value: string | number | null;
	fieldName: string;
	type?: 'text' | 'textarea' | 'select' | 'number';
	options?: { label: string; value: string }[]; // For dropdowns
}

export default function EditableField({
	label,
	value,
	fieldName,
	type = 'text',
	options,
}: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [currentValue, setCurrentValue] = useState(value?.toString() || '');

	const handleSave = async () => {
		try {
			// Transform value back to number if necessary
			const valToSave =
				type === 'number' ? Number(currentValue) : currentValue;
			await updateMemberField(fieldName, valToSave);
			setIsEditing(false);
			toast.success(`${label} updated`);
		} catch (error) {
			toast.error('Failed to save changes');
		}
	};

	if (isEditing) {
		return (
			<div className="p-4 rounded-2xl bg-white border-2 border-rose-500 shadow-md transition-all animate-in fade-in zoom-in-95">
				<p className="text-[10px] text-rose-500 uppercase font-bold mb-2">
					{label}
				</p>

				{type === 'textarea' ? (
					<textarea
						className="w-full bg-transparent outline-none text-gray-800 resize-none text-lg"
						rows={4}
						value={currentValue}
						onChange={(e) => setCurrentValue(e.target.value)}
						autoFocus
					/>
				) : type === 'select' ? (
					<Select
						onValueChange={setCurrentValue}
						defaultValue={currentValue}
					>
						<SelectTrigger className="w-full border-none p-0 h-auto focus:ring-0 text-lg font-semibold">
							<SelectValue placeholder={`Select ${label}`} />
						</SelectTrigger>
						<SelectContent>
							{options?.map((opt) => (
								<SelectItem key={opt.value} value={opt.value}>
									{opt.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				) : (
					<input
						type={type === 'number' ? 'number' : 'text'}
						className="w-full bg-transparent outline-none text-gray-800 font-semibold text-lg"
						value={currentValue}
						onChange={(e) => setCurrentValue(e.target.value)}
						autoFocus
					/>
				)}

				<div className="flex justify-end gap-3 mt-3 border-t pt-2">
					<button
						onClick={() => setIsEditing(false)}
						className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors"
					>
						<X size={16} /> Cancel
					</button>
					<button
						onClick={handleSave}
						className="flex items-center gap-1 text-sm font-bold text-rose-500 hover:text-rose-600 transition-colors"
					>
						<Check size={16} /> Save
					</button>
				</div>
			</div>
		);
	}

	return (
		<div
			onClick={() => setIsEditing(true)}
			className="group relative flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 cursor-pointer hover:border-rose-200 hover:bg-rose-50/30 transition-all duration-200"
		>
			<div className="flex-1">
				<p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter leading-none mb-1 group-hover:text-rose-400">
					{label}
				</p>
				<p
					className={`text-gray-800 leading-tight ${
						type === 'textarea'
							? 'text-md italic'
							: 'font-semibold text-lg'
					} capitalize`}
				>
					{value || `Add ${label}...`}
				</p>
			</div>
			<div className="p-2 rounded-full bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
				<Edit2 size={14} className="text-rose-400" />
			</div>
		</div>
	);
}
