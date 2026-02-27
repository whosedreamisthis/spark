'use server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

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
