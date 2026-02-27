import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import ImageUploadButton from '@/components/edit/ImageUploadButton';
import PhotoManager from '@/components/PhotoManager';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, Camera } from 'lucide-react';

export default async function EditPhotosPage() {
	const { userId } = await auth();
	const member = await prisma.member.findUnique({
		where: { clerkId: userId as string },
		include: { photos: true }, // Assuming you have a photos relation
	});

	if (!member) return <div>Profile not found...</div>;

	return (
		<div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
			<div className="flex items-center justify-between">
				<Button asChild variant="ghost" size="sm">
					<Link
						href="/profile/edit"
						className="flex items-center gap-2"
					>
						<ChevronLeft size={16} /> Back to Edit
					</Link>
				</Button>
				<h1 className="text-2xl font-bold flex items-center gap-2">
					<Camera className="text-rose-500" /> My Photos
				</h1>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{/* Left Col: Upload Section */}
				<div className="md:col-span-1 space-y-4">
					<div className="bg-rose-50 p-6 rounded-2xl border-2 border-dashed border-rose-200 text-center">
						<h3 className="font-semibold text-rose-900 mb-2">
							Add New Photo
						</h3>
						<p className="text-xs text-rose-600 mb-6">
							Upload up to 6 high-quality photos to increase
							matches.
						</p>
						<ImageUploadButton
							memberId={member.id}
							photoCount={member.photos.length}
						/>
					</div>
				</div>

				{/* Right Col: Manage Section */}
				<div className="md:col-span-2">
					<PhotoManager
						photos={member.photos}
						mainImage={member.image}
					/>
				</div>
			</div>
		</div>
	);
}
