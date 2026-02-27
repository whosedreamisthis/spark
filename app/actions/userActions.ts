'use server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { cloudinary } from '@/lib/cloudinary';

export async function updateMemberProfile(formData: FormData) {
	const { userId } = await auth();
	if (!userId) throw new Error('Unauthorized');

	// Convert FormData to a plain object
	const data = Object.fromEntries(formData.entries());

	// Basic type conversion for numeric fields
	if (data.height) data.height = parseInt(data.height as string);

	await prisma.member.update({
		where: { clerkId: userId },
		data: data,
	});

	revalidatePath('/profile');
	revalidatePath('/profile/edit');
}

export async function addPhotoToMember(url: string, publicId: string) {
	const { userId } = await auth();
	if (!userId) throw new Error('Unauthorized');

	// 1. Find the member
	const member = await prisma.member.findUnique({
		where: { clerkId: userId },
	});

	if (!member) throw new Error('Member not found');

	// 2. Create the photo record
	return await prisma.photo.create({
		data: {
			url,
			publicId,
			memberId: member.id,
		},
	});
}

export async function setMainPhoto(photoId: string) {
	const { userId } = await auth();
	if (!userId) throw new Error('Unauthorized');

	const photo = await prisma.photo.findUnique({ where: { id: photoId } });
	if (!photo) throw new Error('Photo not found');

	// Update the Member record's image field to this photo's URL
	return await prisma.member.update({
		where: { clerkId: userId },
		data: { image: photo.url },
	});
}

export async function deletePhoto(photoId: string) {
	const { userId } = await auth();
	if (!userId) throw new Error('Unauthorized');

	const photo = await prisma.photo.findUnique({ where: { id: photoId } });
	if (!photo) throw new Error('Photo not found');
	if (photo.publicId) {
		// Delete from Cloudinary
		await cloudinary.uploader.destroy(photo.publicId);
	}

	// Delete from Prisma
	return await prisma.photo.delete({
		where: { id: photoId },
	});
}
