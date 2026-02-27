import { getMemberPhotosByUserId } from '@/app/actions/memberActions';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default async function PhotosPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const photos = await getMemberPhotosByUserId(id);

	return (
		<Card className="border-none shadow-none bg-transparent m-5">
			<CardHeader className="px-0 pb-4">
				<div>
					<h2 className="text-2xl font-bold text-gray-800">Photos</h2>
					<p className="text-sm text-muted-foreground">
						A glimpse into their world.
					</p>
				</div>
			</CardHeader>
			<Separator className="mb-6" />
			<CardContent className="px-0">
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
					{photos && photos.length > 0 ? (
						photos.map((photo) => (
							<div
								key={photo.id}
								className="relative aspect-square rounded-xl overflow-hidden group border bg-muted"
							>
								<Image
									src={photo.url}
									alt="Member photo"
									fill
									className="object-cover transition-transform duration-300 group-hover:scale-110"
									sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
								/>
								{/* Subtle overlay on hover */}
								<div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
							</div>
						))
					) : (
						<div className="col-span-full py-20 text-center border-2 border-dashed rounded-2xl">
							<p className="text-muted-foreground italic">
								This member hasn't shared any photos yet.
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}
