'use client';

import Image from 'next/image';
import { Trash2, Star, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTransition } from 'react';
import { deletePhoto, setMainPhoto } from '@/app/actions/userActions';
import { useRouter } from 'next/navigation';

export default function PhotoManager({
	photos,
	mainImage,
}: {
	photos: any[];
	mainImage: string;
}) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleSetMain = (photoId: string) => {
		startTransition(async () => {
			await setMainPhoto(photoId);
			router.refresh();
		});
	};

	const handleDelete = (photoId: string) => {
		startTransition(async () => {
			await deletePhoto(photoId);
			router.refresh();
		});
	};

	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
			{photos.map((photo) => {
				const isMain = photo.url === mainImage;

				return (
					<div
						key={photo.id}
						className="relative aspect-square group rounded-xl overflow-hidden border bg-gray-100"
					>
						<Image
							src={photo.url}
							alt="User photo"
							fill
							className="object-cover transition-transform group-hover:scale-105"
							sizes="(max-width: 768px) 50vw, 33vw"
						/>

						{isMain && (
							<div className="absolute top-2 left-2 bg-rose-500 text-white p-1 rounded-full shadow-lg z-10">
								<Star size={12} fill="currentColor" />
							</div>
						)}

						<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2 gap-2">
							{!isMain && (
								<Button
									onClick={() => handleSetMain(photo.id)}
									disabled={isPending}
									size="sm"
									variant="secondary"
									className="w-full text-[10px] h-7 gap-1"
								>
									Set as Main
								</Button>
							)}
							<Button
								onClick={() => handleDelete(photo.id)}
								disabled={isPending}
								size="sm"
								variant="destructive"
								className="w-full text-[10px] h-7 gap-1"
							>
								{isPending ? (
									<Loader2
										className="animate-spin"
										size={12}
									/>
								) : (
									<Trash2 size={12} />
								)}
								Delete
							</Button>
						</div>
					</div>
				);
			})}

			{/* Empty slots logic remains the same */}
		</div>
	);
}
