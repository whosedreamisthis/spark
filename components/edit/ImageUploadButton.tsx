'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@/components/ui/button';
import { ImagePlus, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addPhotoToMember } from '@/app/actions/userActions';

interface Props {
	memberId: string;
	photoCount: number;
}

export default function ImageUploadButton({ memberId, photoCount }: Props) {
	const router = useRouter();

	const isLimitReached = photoCount >= 6;

	const onUpload = async (result: any) => {
		if (result.event === 'success') {
			await addPhotoToMember(
				result.info.secure_url,
				result.info.public_id,
			);
			router.refresh();
		}
	};

	if (isLimitReached) {
		return (
			<div className="flex flex-col items-center gap-2 p-4 bg-amber-50 rounded-lg border border-amber-200">
				<AlertCircle className="text-amber-600" size={24} />
				<p className="text-sm font-medium text-amber-800">
					Photo limit reached
				</p>
				<p className="text-[10px] text-amber-600">
					Delete a photo before adding more
				</p>
			</div>
		);
	}

	return (
		<CldUploadWidget
			uploadPreset="spark_preset"
			onSuccess={onUpload}
			options={{ maxFiles: 1 }}
		>
			{({ open }) => (
				<Button
					onClick={() => open()}
					className="w-full bg-rose-500 hover:bg-rose-600 gap-2"
				>
					<ImagePlus size={18} />
					Upload Image
				</Button>
			)}
		</CldUploadWidget>
	);
}
