import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import EditHeaderSection from '@/components/edit/EditHeaderSection';
import EditAboutSection from '@/components/edit/EditAboutSection';
import EditEssentialsSection from '@/components/edit/EditEssentialSection';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function EditProfilePage() {
	const { userId } = await auth();
	const member = await prisma.member.findUnique({
		where: { clerkId: userId as string },
	});

	if (!member) return <div>Profile not found...</div>;

	return (
		<div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 pb-32">
			<Button asChild variant="ghost" size="sm" className="mb-4">
				<Link href="/profile" className="flex items-center gap-2">
					<ChevronLeft size={16} /> Back to Profile
				</Link>
			</Button>

			<EditHeaderSection member={member} />
			<EditAboutSection member={member} />
			<EditEssentialsSection member={member} />
		</div>
	);
}
